// Offline V1.7.2 smoke/regression tests for BOTH Hybrid render paths.
// WebGL API calls are mocked; Canvas2D fallback and gesture physics are executed.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
assert(!html.includes('{{PHOTON_'),'Model was not baked');
assert(!html.includes('https://'),'Standalone view must not require network');
assert(html.includes('V1.7.2'));
const script=html.split('<script>')[1].split('</script>')[0];

function createGL(){
  const calls={points:0,frames:0,background:0,lastPointCount:0};
  const gl={
    VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,COMPILE_STATUS:35713,
    LINK_STATUS:35714,ARRAY_BUFFER:34962,STATIC_DRAW:35044,DYNAMIC_DRAW:35048,
    DEPTH_TEST:2929,BLEND:3042,COLOR_BUFFER_BIT:16384,NO_ERROR:0,
    TRIANGLE_STRIP:5,POINTS:0,FLOAT:5126,SRC_ALPHA:770,
    ONE_MINUS_SRC_ALPHA:771,ONE:1,
    createShader(){return {};},shaderSource(){},compileShader(){},
    getShaderParameter(){return true;},getShaderInfoLog(){return '';},
    createProgram(){return {};},attachShader(){},linkProgram(){},
    getProgramParameter(){return true;},getProgramInfoLog(){return '';},
    createBuffer(){return {};},bindBuffer(){},bufferData(){},
    disable(){},enable(){},viewport(){},clearColor(){},clear(){},
    getAttribLocation(_p,k){return ({aCorner:0,aScreen:1,aBand:2})[k]??-1;},
    getUniformLocation(){return {};},useProgram(){},
    disableVertexAttribArray(){},enableVertexAttribArray(){},
    vertexAttribPointer(){},uniform1f(){},uniform2f(){},blendFunc(){},
    drawArrays(mode,_first,count){
      calls.frames++;
      if(mode===this.POINTS){calls.points++;calls.lastPointCount=count;}
      else if(mode===this.TRIANGLE_STRIP)calls.background++;
    },
    getError(){return 0;}
  };
  return {gl,calls};
}
function run(mode){
  let time=1000,frame=null,drawCalls=0;
  const listeners={},glListeners={};
  function context(){
    return {fillStyle:'',strokeStyle:'',lineWidth:1,globalCompositeOperation:'',
      setTransform(){},fillRect(){drawCalls++;},clearRect(){},
      createRadialGradient(){return {addColorStop(){}};},
      beginPath(){},arc(){},stroke(){}};
  }
  const fx={width:0,height:0,getContext(){return context();},style:{}};
  const canvas={width:0,height:0,style:{},getContext(kind){assert.equal(kind,'2d');return context();}};
  const {gl,calls}=createGL();
  const glCanvas={width:0,height:0,style:{},
    getContext(kind){return mode==='webgl'&&(kind==='webgl2'||kind==='webgl')?gl:null;},
    addEventListener(k,cb){glListeners[k]=cb;}
  };
  const input={addEventListener(k,cb){listeners[k]=cb;},setPointerCapture(){}};
  const dom={canvas,glCanvas,fxCanvas:fx,interaction:input,
    status:{textContent:''},problem:{style:{display:'none'},textContent:''}};
  const sandbox={window:{},document:{getElementById:id=>dom[id]},
    innerWidth:1440,innerHeight:900,devicePixelRatio:1,
    performance:{now:()=>time},requestAnimationFrame(cb){frame=cb;},
    addEventListener(){},
    atob(str){return Buffer.from(str,'base64').toString('latin1');}};
  vm.runInNewContext(script,sandbox,{timeout:20000});
  const dbg=sandbox.window.photonDebug;
  assert(dbg,'Missing photonDebug');
  const tick=(n=1)=>{
    for(let i=0;i<n;i++){time+=16.667;const callback=frame;assert(callback,'Animation loop stopped');frame=null;callback(time);}
  };
  const mouse=(x,y,opts={})=>({clientX:x,clientY:y,button:0,pointerId:1,shiftKey:false,...opts});
  tick(2);
  assert.equal(dbg.status,'ready');
  assert.equal(dbg.version,'1.7.2');
  assert.equal(dbg.points,12000);
  assert.equal(dbg.config.density,12000);
  assert.equal(dbg.config.distribution,'blue');
  assert.equal(dbg.config.hold,'repel');
  assert.equal(dbg.config.renderer,'hybrid');
  assert.equal(dbg.physics.chargeRadiusPx,92);
  assert.equal(dbg.physics.chargeRate,.018);
  assert.equal(dbg.physics.maxCharge,1.25);
  assert.equal(dbg.physics.contactEaseMs,220);
  assert.equal(dbg.physics.shockMaxPx,220);
  assert.equal(dbg.physics.maxOffset,.26);
  if(mode==='webgl'){
    assert.equal(dbg.renderer,'WebGL');
    assert(dbg.webglAvailable);
    assert(calls.points>=2 && calls.lastPointCount===12000);
  }else{
    assert.equal(dbg.renderer,'Canvas2D (fallback)');
    assert(dbg.fallbackReason,'WebGL unavailable should report fallback reason');
    assert(drawCalls>12000);
  }
  assert(dbg.drawCalls>6000,'Photon field not visible');
  assert.equal(dom.problem.style.display,'none');

  listeners.pointerenter(mouse(700,460));
  tick();
  let firstContact=0,firstSpeed=0;
  for(let i=0;i<25;i++){
    listeners.pointermove(mouse(700+Math.sin(i*1.4)*14,460+Math.cos(i*1.4)*9));
    tick();
    if(i===0){firstContact=dbg.maxContact;firstSpeed=dbg.pointerSmoothedSpeed;}
  }
  const settledContact=dbg.maxContact, speedBeforeIdle=dbg.pointerSmoothedSpeed;
  assert(firstContact>0 && firstContact<.03,'Contact ease-in too abrupt');
  assert(settledContact>firstContact*3,'Per-photon easing was lost');
  assert(firstSpeed>0 && firstSpeed<10,'Pointer velocity not smoothed');
  assert(dbg.scatterHits>20 && dbg.maxDisplacementPx>1,'Scatter failed');
  tick(25);
  assert(dbg.pointerSmoothedSpeed<speedBeforeIdle*.2,'Velocity failed to decay');
  assert(dbg.maxContact<settledContact*.5,'Contact failed to fade');

  const hitsBefore=dbg.holdRepelHits, outwardBefore=dbg.holdRepelImpulse;
  listeners.pointerdown(mouse(720,460));
  tick(50);
  assert(dbg.holdRepelHits>hitsBefore+50,'Hold=Repel did not affect nearby photons');
  assert(dbg.holdRepelImpulse>outwardBefore,'No outward Hold=Repel impulse');
  assert(dbg.charge>.5&&dbg.charge<=1.25,'Repel intensity ramp did not obey cap');
  listeners.pointerup(mouse(720,460));
  tick(22);
  assert.equal(dbg.releaseEvents,1,'Release shockwave missing');
  assert(dbg.shockHits>0 && dbg.maxShockHitDistancePx<=220.01,'Shockwave is not local');
  assert(dbg.maxDisplacementPx<220,'Maximum displacement not bounded');

  listeners.pointerdown(mouse(720,460,{shiftKey:true}));
  listeners.pointermove(mouse(910,495,{shiftKey:true}));
  tick(24);
  listeners.pointerup(mouse(910,495,{shiftKey:true}));
  tick(4);
  assert(Math.abs(dbg.orbitYaw)>.1,'Shift+drag orbit failed');
  assert.equal(dbg.releaseEvents,1,'Orbit mistakenly triggered shockwave');

  if(mode==='webgl'){
    assert(dbg.webglFrames>30&&dbg.webglDrawCalls>30,'GPU rendering did not continue');
    const before=drawCalls;
    let prevented=false;
    glListeners.webglcontextlost({preventDefault(){prevented=true;}});
    tick(3);
    assert(prevented);
    assert.equal(dbg.renderer,'Canvas2D (fallback)','WebGL context-loss fallback failed');
    assert(drawCalls>before,'Canvas did not render after context loss');
  }
  assert.equal(dbg.status,'ready','A JavaScript runtime error occurred');
  assert.equal(dom.problem.style.display,'none');
  return {mode,points:dbg.points,scatterHits:dbg.scatterHits,
    holdRepelHits:dbg.holdRepelHits,holdRepelImpulse:dbg.holdRepelImpulse,
    shockHits:dbg.shockHits,maxShockHitDistancePx:dbg.maxShockHitDistancePx,
    maxDisplacementPx:dbg.maxDisplacementPx,webglFrames:dbg.webglFrames};
}
const a=run('webgl'),b=run('fallback');
console.log('PASS V1.7.2: both render paths verified',JSON.stringify({webgl:a,canvas:b}));
