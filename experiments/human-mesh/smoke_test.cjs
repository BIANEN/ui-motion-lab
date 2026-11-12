// CI smoke test: offline human photons and all V1.7 pointer physics.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
assert(!html.includes('{{PHOTON_'));
assert(!html.includes('https://'));
assert(html.includes('V1.7'));
const script=html.split('<script>')[1].split('</script>')[0];
const handlers={},globalHandlers={};
let nextFrame=null,drawCalls=0;
const ctx={fillStyle:'',strokeStyle:'',lineWidth:1,globalCompositeOperation:'source-over',
  setTransform(){},fillRect(){drawCalls++},
  createRadialGradient(){return {addColorStop(){}}},
  beginPath(){},arc(){},stroke(){}};
const canvas={width:0,height:0,getContext(name){assert.equal(name,'2d');return ctx;},
  addEventListener(name,fn){handlers[name]=fn;},setPointerCapture(){}};
const dom={canvas,status:{textContent:''},problem:{style:{display:'none'},textContent:''}};
const sandbox={window:{},document:{getElementById:id=>dom[id]},
  innerWidth:1440,innerHeight:900,devicePixelRatio:1,
  performance:{now:()=>1000},
  requestAnimationFrame(fn){nextFrame=fn;},
  addEventListener(name,fn){globalHandlers[name]=fn;},
  atob(value){return Buffer.from(value,'base64').toString('latin1');}};
vm.runInNewContext(script,sandbox,{timeout:20000});
assert(nextFrame,'Animation loop not scheduled');
let time=1016.667;
function tick(times){for(let n=0;n<times;n++){const fn=nextFrame;assert(fn,'Frame not scheduled');nextFrame=null;fn(time);time+=16.667;}}
function mouse(x,y,extra={}){return {clientX:x,clientY:y,button:0,pointerId:1,shiftKey:false,...extra};}
tick(2);
const debug=sandbox.window.photonDebug;
assert.equal(debug.loaded,true);
assert.equal(debug.points,18000);
assert.equal(debug.config.distribution,'blue');
assert.equal(debug.config.release,'shockwave');
assert(debug.drawCalls>8000,'Too few visible photons');
assert.equal(dom.problem.style.display,'none','Rendering error reported');
handlers.pointerenter(mouse(650,470));
for(let i=0;i<12;i++){handlers.pointermove(mouse(650+i*14,470+(i%3)*3));tick(1);}
assert(debug.scatterHits>30,'Scatter physics did not affect photons');
assert(debug.maxDisplacementPx>2,'Scatter displacement was not visible');
handlers.pointerdown(mouse(720,460));
tick(45);
assert(debug.charge>.5,'Charge should accumulate while held');
handlers.pointerup(mouse(720,460));
tick(22);
assert.equal(debug.releaseEvents,1,'Release must launch shockwave');
assert(debug.maxDisplacementPx>4,'Shockwave displacement absent');
handlers.pointerdown(mouse(720,460,{shiftKey:true}));
handlers.pointermove(mouse(910,495,{shiftKey:true}));
tick(24);
handlers.pointerup(mouse(910,495,{shiftKey:true}));
tick(4);
assert(Math.abs(debug.orbitYaw)>.1,'Orbit did not rotate camera');
assert.equal(debug.status,'ready');
assert(drawCalls>18000);
console.log('PASS V1.7: '+debug.points+' points; scatter '+debug.scatterHits+
  '; releases '+debug.releaseEvents+'; max displacement '+debug.maxDisplacementPx+
  'px; orbit yaw '+debug.orbitYaw.toFixed(2)+' radians; '+drawCalls+' drawing calls.');
