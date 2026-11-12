// V1.7.1 regression test: actual baked data, Canvas 2D, and soft-contact physics.
// Runs entirely offline in Node and simulates a normal 60 Hz pointer timeline.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
assert(!html.includes('{{PHOTON_'),'Unbaked model coordinates');
assert(!html.includes('https://'),'Unexpected runtime dependency');
assert(html.includes('V1.7.1'),'Incorrect experiment version');
const script=html.split('<script>')[1].split('</script>')[0];
const handlers={};
let nextFrame=null,drawCalls=0,time=1000;
const ctx={
  fillStyle:'',strokeStyle:'',lineWidth:1,globalCompositeOperation:'source-over',
  setTransform(){},fillRect(){drawCalls++},
  createRadialGradient(){return{addColorStop(){}}},
  beginPath(){},arc(){},stroke(){}
};
const canvas={
  width:0,height:0,
  getContext(name){assert.equal(name,'2d');return ctx;},
  addEventListener(name,fn){handlers[name]=fn;},
  setPointerCapture(){}
};
const elements={canvas,status:{textContent:''},problem:{style:{display:'none'},textContent:''}};
const sandbox={
  window:{},
  document:{getElementById:id=>elements[id]},
  innerWidth:1440,innerHeight:900,devicePixelRatio:1,
  performance:{now:()=>time},
  requestAnimationFrame(fn){nextFrame=fn;},
  addEventListener(){},
  atob(value){return Buffer.from(value,'base64').toString('latin1');}
};
vm.runInNewContext(script,sandbox,{timeout:20000});
assert(nextFrame,'No animation frame scheduled');
function tick(frames=1){
  for(let n=0;n<frames;n++){
    time+=16.667;
    const fn=nextFrame;
    assert(fn,'Renderer stopped scheduling frames');
    nextFrame=null;
    fn(time);
  }
}
function mouse(x,y,extra={}){
  return{clientX:x,clientY:y,button:0,pointerId:1,shiftKey:false,...extra};
}
tick(2);
const dbg=sandbox.window.photonDebug;
assert.equal(dbg.loaded,true);
assert.equal(dbg.version,'1.7.1');
assert.equal(dbg.points,18000);
assert.equal(dbg.config.distribution,'blue');
assert.equal(dbg.physics.contactEaseMs,220);
assert.equal(dbg.physics.scatterRadiusPx,130);
assert.equal(dbg.physics.scatterVelocity,.0032);
assert.equal(dbg.physics.shockMaxPx,220);
assert.equal(dbg.physics.shockSpeedPx,11);
assert.equal(dbg.physics.shockWidthPx,28);
assert.equal(dbg.physics.shockVelocity,.004);
assert.equal(dbg.physics.maxOffset,.26);
assert(dbg.drawCalls>8000,'Missing visible photons');
assert.equal(elements.problem.style.display,'none','Unexpected rendering error');

handlers.pointerenter(mouse(700,460));
tick();
let firstContact=0,firstSmoothSpeed=0;
for(let i=0;i<25;i++){
  // Small moves keep the cursor near the same mesh patch, testing local
  // per-photon easing instead of one global switch for the entire figure.
  handlers.pointermove(mouse(700+Math.sin(i*1.4)*14,460+Math.cos(i*1.4)*9));
  tick();
  if(i===0){firstContact=dbg.maxContact;firstSmoothSpeed=dbg.pointerSmoothedSpeed;}
}
const settledContact=dbg.maxContact;
const speedBeforeIdle=dbg.pointerSmoothedSpeed;
assert(firstContact>0&&firstContact<.025,'Contact begins too abruptly');
assert(settledContact>firstContact*4,'Contact force did not ease in gradually');
assert(firstSmoothSpeed>0&&firstSmoothSpeed<10,'Pointer speed was not initially smoothed');
assert(dbg.scatterHits>50,'Moving pointer failed to scatter photons');
assert(dbg.maxDisplacementPx>2,'Scattered photons did not move');
tick(25);
assert(dbg.pointerSmoothedSpeed<speedBeforeIdle*.2,'Pointer velocity did not smooth back toward zero');
assert(dbg.maxContact<settledContact*.5,'Photon contact did not fade after mouse stopped');

handlers.pointerdown(mouse(720,460));
tick(45);
assert(dbg.charge>.5,'Hold charge did not accumulate');
handlers.pointerup(mouse(720,460));
tick(22);
assert.equal(dbg.releaseEvents,1,'Release shockwave not launched');
assert(dbg.shockHits>0,'Shockwave did not reach the mesh');
assert(dbg.maxShockHitDistancePx<=220.01,'Shockwave acted beyond 220px boundary');
assert(dbg.maxDisplacementPx<250,'Offset is not bounded by .26 body-height units');
assert.equal(dbg.waveRadiusPx,0,'Shockwave should expire by maximum radius');

handlers.pointerdown(mouse(720,460,{shiftKey:true}));
handlers.pointermove(mouse(910,495,{shiftKey:true}));
tick(24);
handlers.pointerup(mouse(910,495,{shiftKey:true}));
tick(4);
assert(Math.abs(dbg.orbitYaw)>.1,'Shift+drag orbit did not work');
assert.equal(dbg.releaseEvents,1,'Orbit drag must not emit shockwave');
assert.equal(dbg.status,'ready');
assert(drawCalls>18000,'Canvas rendering is inactive');
console.log('PASS V1.7.1: '+dbg.points+' photons | initial contact '+
  firstContact.toFixed(4)+' -> '+settledContact.toFixed(4)+
  ' | idle pointer speed '+speedBeforeIdle.toFixed(3)+' -> '+dbg.pointerSmoothedSpeed.toFixed(3)+
  ' | shock hits '+dbg.shockHits+' within '+dbg.maxShockHitDistancePx.toFixed(2)+
  'px | max displacement '+dbg.maxDisplacementPx+'px | orbit '+dbg.orbitYaw.toFixed(2)+'rad.');
