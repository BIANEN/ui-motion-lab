/**
 * 02 Rainbow Flow Body — procedural 3D code prototype.
 * Data: ../review/asset-spec.json
 * Every curve is an actual world-space TubeGeometry (not a billboard or an image).
 * Units and paths are reconstruction hypotheses; user acceptance is still required.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const canvas = document.getElementById("scene");
const stage = canvas.parentElement;
const status = document.getElementById("status");
const error = document.getElementById("error");
let active = true;
let scene, camera, renderer, composer, controls, bloomPass, crownRings;
let layerGroups = {};
let nodes = [];
let modelData = null;
let animationTime = 0;
let clock = new THREE.Clock();
const timeUniform = { value: 0 };
const state = { playing:true, speed:0.6, useBloom:true };
const v = (point) => new THREE.Vector3(point[0],point[1],point[2]);

function setStatus(message) {
  status.textContent = message;
}
function fail(reason) {
  setStatus("无法加载原型 · 请查看错误");
  error.style.display = "flex";
  error.textContent = reason;
  console.error("[Rainbow Body 02]", reason);
}
function makeGroup(name) {
  const group = new THREE.Group();
  group.name = name;
  scene.add(group);
  return group;
}
function ghostMaterial(extra = {}) {
  return new THREE.MeshBasicMaterial({
    color:0x0f81d1,
    transparent:true,
    opacity:0.055,
    depthWrite:false,
    side:THREE.DoubleSide,
    ...extra
  });
}
function ellipse(parent, name, pos, size, material) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1,28,16),material);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.scale.set(...size);
  parent.add(mesh);
  return mesh;
}
function segment(parent, name, a, b, r1, r2, material) {
  const from = v(a), to = v(b);
  const delta = new THREE.Vector3().subVectors(to,from);
  const geometry = new THREE.CylinderGeometry(r1,r2,delta.length(),16,1,false);
  const mesh = new THREE.Mesh(geometry,material);
  mesh.name = name;
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
  parent.add(mesh);
  return mesh;
}
function buildBody() {
  const body = layerGroups.body;
  const material = ghostMaterial();
  const lineMaterial = ghostMaterial({color:0x2468e6,wireframe:true,opacity:0.026});
  const head=ellipse(body,"HEAD",[0,0.78,0],[0.106,0.145,0.098],material);
  ellipse(body,"HEAD_INNER",[0,0.78,0],[0.107,0.146,0.10],lineMaterial);
  segment(body,"NECK",[0,0.58,0],[0,0.68,0],0.055,0.052,material);
  const pts = [
    [0.06,-0.33],[0.12,-0.30],[0.165,-0.25],[0.145,-0.09],
    [0.13,0.07],[0.15,0.19],[0.205,0.35],[0.21,0.46],
    [0.125,0.54],[0.066,0.57]
  ].map(([radius,y])=>new THREE.Vector2(radius,y));
  const torso = new THREE.Mesh(new THREE.LatheGeometry(pts,36),material);
  torso.name = "TORSO_PROCEDURAL_LATHE";
  torso.scale.z = 0.68;
  body.add(torso);
  ellipse(body,"PELVIS",[0,-0.27,0],[0.164,0.095,0.112],material);
  for (const side of [-1,1]) {
    const joint = (x,y,z=0) => [x*side,y,z];
    const shoulder=joint(0.20,0.46);
    const elbow=joint(0.45,0.28,-0.005);
    const wrist=joint(0.67,0.12,0.005);
    segment(body,`UPPER_ARM_${side}`,shoulder,elbow,0.068,0.052,material);
    segment(body,`FOREARM_${side}`,elbow,wrist,0.047,0.032,material);
    ellipse(body,`HAND_${side}`,joint(0.71,0.085,0.006),[0.036,0.070,0.025],material);
    const hip=joint(0.095,-0.30,0);
    const knee=joint(0.18,-0.59,0);
    const ankle=joint(0.265,-0.84,0);
    segment(body,`THIGH_${side}`,hip,knee,0.09,0.066,material);
    segment(body,`CALF_${side}`,knee,ankle,0.065,0.036,material);
    ellipse(body,`FOOT_${side}`,joint(0.285,-0.905,0.065),[0.061,0.032,0.125],material);
  }
  // The magenta head-edge acts as a volumetric cue; it is NOT a photo-sprite.
  ellipse(body,"AURA_HEAD",[0,0.78,-0.008],[0.117,0.154,0.107],
    ghostMaterial({color:0x991bfe,opacity:0.08,blending:THREE.AdditiveBlending}));
}

const vertexShader = `
  varying float vProgress;
  void main() {
    vProgress = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  varying float vProgress;
  void main() {
    float pulse = pow(max(0.0, sin(vProgress * 48.0 - uTime * 7.5)), 7.0);
    float shimmer = 0.60 + 0.20 * sin(vProgress * 14.0 - uTime * 2.6);
    vec3 emission = uColor * (shimmer + 0.42 * pulse);
    float a = uOpacity * (0.52 + 0.22 * shimmer + 0.12 * pulse);
    gl_FragColor = vec4(emission, min(a, 1.0));
  }
`;
function flowMaterial(hexColor, opacity) {
  return new THREE.ShaderMaterial({
    uniforms:{
      uColor:{value:new THREE.Color(hexColor)},
      uTime:timeUniform,
      uOpacity:{value:opacity}
    },
    vertexShader,
    fragmentShader,
    transparent:true,
    depthWrite:false,
    side:THREE.DoubleSide,
    blending:THREE.AdditiveBlending
  });
}
function buildCurves(spec) {
  const flow=layerGroups.flow;
  for(const item of spec.curves) {
    const path = new THREE.CatmullRomCurve3(item.points.map(v),false,"centripetal");
    for (const [suffix,radius,opacity] of [["-halo",item.radius*2.15,0.028],["-core",item.radius,0.66]]) {
      const geometry = new THREE.TubeGeometry(path,94,radius,7,false);
      const mesh = new THREE.Mesh(geometry,flowMaterial(item.color,opacity));
      mesh.name = item.id + suffix;
      mesh.userData = {curveId:item.id,source:"hypothesis",depth:item.depth};
      mesh.frustumCulled = false;
      flow.add(mesh);
    }
  }
}
function basicGlow(color,opacity) {
  return new THREE.MeshBasicMaterial({
    color,transparent:true,opacity,blending:THREE.AdditiveBlending,
    depthWrite:false,side:THREE.DoubleSide
  });
}
function buildNodes(spec) {
  nodes=[];
  for(const item of spec.nodes) {
    const group=new THREE.Group();
    group.name=item.id+"-"+item.label;
    group.position.copy(v(item.center));
    const halo=new THREE.Mesh(new THREE.SphereGeometry(item.radius*2.6,24,16),basicGlow(item.color,0.052));
    const center=new THREE.Mesh(new THREE.SphereGeometry(item.radius,24,16),basicGlow(item.color,0.74));
    const sparkle=new THREE.Mesh(new THREE.SphereGeometry(item.radius*0.33,16,12),basicGlow(0xffffff,0.42));
    group.add(halo,center,sparkle);
    group.userData.source="inferred-world-position";
    layerGroups.nodes.add(group);
    nodes.push({halo,center,group});
  }
}
function buildCrown(spec) {
  const c=spec.crown;
  const h=c.topY-c.baseY;
  // CylinderGeometry(radiusTop,radiusBottom) is oriented along world Y.
  const shell=new THREE.Mesh(
    new THREE.CylinderGeometry(c.topRadius,c.baseRadius,h,56,1,true),
    basicGlow(0xe9f4ff,0.012)
  );
  shell.name="CROWN_VOLUMETRIC_SHELL";
  shell.position.y=(c.baseY+c.topY)/2;
  layerGroups.crown.add(shell);
  const inner=new THREE.Mesh(new THREE.CylinderGeometry(c.topRadius*0.65,c.baseRadius*0.5,h,48,1,true),basicGlow(0xffffff,0.009));
  inner.position.y=shell.position.y;
  layerGroups.crown.add(inner);
  crownRings=[];
  for (let i=0;i<c.rings.length;i++) {
    const y=c.rings[i], f=(y-c.baseY)/h;
    const radius=c.baseRadius+(c.topRadius-c.baseRadius)*f;
    const torus=new THREE.Mesh(new THREE.TorusGeometry(radius,0.0026,7,50),basicGlow(0xffffff,0.42));
    torus.name="CROWN_RING_"+i;
    torus.rotation.x=Math.PI/2;
    torus.position.y=y;
    layerGroups.crown.add(torus);
    crownRings.push(torus);
  }
}
function addSceneFeatures(spec) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(spec.shader.background || "#000000");
  layerGroups = {
    body:makeGroup("HumanBody3D"),
    flow:makeGroup("RainbowFlow3D"),
    nodes:makeGroup("EnergyNodes3D"),
    crown:makeGroup("CrownBeam3D")
  };
  buildBody();
  buildCurves(spec);
  buildNodes(spec);
  buildCrown(spec);
}
function makeRenderer() {
  const width=Math.max(stage.clientWidth,320);
  const height=Math.max(stage.clientHeight,480);
  renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
  renderer.setSize(width,height,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.1;
  camera = new THREE.PerspectiveCamera(38,width/height,0.01,50);
  camera.position.set(2.15,0.62,3.3);
  controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;
  controls.dampingFactor=0.08;
  controls.target.set(0,0.17,0);
  controls.minDistance=1.65;
  controls.maxDistance=9.5;
  controls.maxPolarAngle=Math.PI-0.03;
  controls.autoRotate=false;
  controls.update();
  composer=new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));
  bloomPass=new UnrealBloomPass(new THREE.Vector2(width,height),0.25,0.12,0.89);
  bloomPass.threshold=0.89;
  bloomPass.strength=0.25;
  bloomPass.radius=0.12;
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
}
function setCamera(view) {
  const target=new THREE.Vector3(0,0.18,0);
  const poses = {
    front:[0,0.18,3.85],
    right:[3.85,0.18,0],
    back:[0,0.18,-3.85],
    three:[2.6,0.71,3.0],
    top:[0,3.85,0.01]
  };
  if(view==="auto") {
    controls.autoRotate=!controls.autoRotate;
    controls.autoRotateSpeed=0.85;
  } else if(poses[view]) {
    controls.autoRotate=false;
    camera.position.set(...poses[view]);
    controls.target.copy(target);
    camera.lookAt(target);
    controls.update();
  }
  document.querySelectorAll("[data-camera]").forEach((button)=>{
    button.classList.toggle("active",view===button.dataset.camera || (button.dataset.camera==="auto"&&controls.autoRotate));
  });
}
function setupInputs(spec) {
  document.querySelectorAll("[data-camera]").forEach(button=>{
    button.addEventListener("click",()=>setCamera(button.dataset.camera));
  });
  document.querySelectorAll("input[data-layer]").forEach(input=>{
    const name=input.dataset.layer;
    input.addEventListener("change",()=>{
      if(name==="bloom") state.useBloom=input.checked;
      else layerGroups[name].visible=input.checked;
    });
  });
  const speed=document.getElementById("speed"), bloom=document.getElementById("bloom-strength");
  speed.value=String(spec.shader.flowSpeed??0.6);
  bloom.value=String(spec.shader.bloomStrength??1.25);
  state.speed=Number(speed.value);
  bloomPass.strength=Number(bloom.value);
  document.getElementById("speed-val").textContent=state.speed.toFixed(2)+"×";
  document.getElementById("bloom-val").textContent=bloomPass.strength.toFixed(2);
  speed.addEventListener("input",()=>{
    state.speed=Number(speed.value);
    document.getElementById("speed-val").textContent=state.speed.toFixed(2)+"×";
  });
  bloom.addEventListener("input",()=>{
    bloomPass.strength=Number(bloom.value);
    document.getElementById("bloom-val").textContent=bloomPass.strength.toFixed(2);
  });
  document.getElementById("animate").addEventListener("change",e=>{state.playing=e.target.checked});
}
function resize() {
  if(!renderer) return;
  const width=Math.max(1,stage.clientWidth),height=Math.max(1,stage.clientHeight);
  camera.aspect=width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width,height,false);
  composer.setSize(width,height);
}
function animate() {
  if(!active)return;
  requestAnimationFrame(animate);
  const delta=Math.min(clock.getDelta(),0.05);
  if(state.playing) animationTime+=delta*state.speed;
  timeUniform.value=animationTime;
  nodes.forEach((item,i)=>{
    item.halo.material.opacity=0.052+0.017*Math.sin(animationTime*3+i*0.8);
    item.group.scale.setScalar(1+0.04*Math.sin(animationTime*2.3+i));
  });
  if(crownRings) crownRings.forEach((ring,i)=>ring.scale.setScalar(1+0.025*Math.sin(animationTime*3-i)));
  controls.update();
  if(state.useBloom)composer.render();else renderer.render(scene,camera);
}
async function start() {
  try {
    const res=await fetch(new URL("../review/asset-spec.json",import.meta.url),{cache:"no-cache"});
    if(!res.ok)throw new Error("参数 JSON 加载失败，HTTP "+res.status);
    modelData=await res.json();
    if(modelData.assetId!=="02"||!Array.isArray(modelData.curves)||!Array.isArray(modelData.nodes))
      throw new Error("资产参数 JSON 结构或编号错误");
    addSceneFeatures(modelData);
    makeRenderer();
    setupInputs(modelData);
    const observer=new ResizeObserver(()=>resize());
    observer.observe(stage);
    window.addEventListener("resize",resize,{passive:true});
    window.__rainbowDebug = Object.freeze({
      assetId:"02",status:"prototype-not-approved",
      bodyMeshCount:layerGroups.body.children.length,
      curveMeshCount:layerGroups.flow.children.length,
      curvePaths:modelData.curves.length,
      nodeCount:nodes.length,
      crownRings:crownRings.length,
      getViewState:()=>({camera:[camera.position.x,camera.position.y,camera.position.z],bloom:state.useBloom,speed:state.speed,animating:state.playing}),
      getLayerVisibility:()=>Object.fromEntries(Object.entries(layerGroups).map(([id,g])=>[id,g.visible]))
    });
    setStatus("3D 场景已构建 · DRAFT / 待视觉与性能验收");
    setCamera("front");
    animate();
  } catch(err) {
    fail(err instanceof Error?err.message:String(err));
  }
}
start();
