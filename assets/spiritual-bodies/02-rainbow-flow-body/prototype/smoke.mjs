/** Headless browser smoke: real WebGL 3D stage, camera, layers, animation. */
import assert from "node:assert/strict";
import {mkdirSync,writeFileSync} from "node:fs";
import {chromium} from "playwright";
import {PNG} from "pngjs";
const dest="assets/spiritual-bodies/02-rainbow-flow-body/prototype/rendered";
mkdirSync(dest,{recursive:true});
const failures=[];
const browser=await chromium.launch({
  headless:true,
  args:["--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist","--no-sandbox","--disable-dev-shm-usage"]
});
try{
  const page=await browser.newPage({viewport:{width:1360,height:860},deviceScaleFactor:1});
  page.on("pageerror",(err)=>failures.push("pageerror: "+err.message));
  page.on("console",(msg)=>{if(msg.type()==="error")failures.push("console: "+msg.text())});
  const url="http://127.0.0.1:8791/assets/spiritual-bodies/02-rainbow-flow-body/prototype/";
  await page.goto(url,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>Boolean(window.__rainbowDebug),null,{timeout:60000});
  const d=await page.evaluate(()=>({
     paths:window.__rainbowDebug.curvePaths,
     meshes:window.__rainbowDebug.curveMeshCount,
     nodes:window.__rainbowDebug.nodeCount,
     body:window.__rainbowDebug.bodyMeshCount,
     rings:window.__rainbowDebug.crownRings,
     layers:window.__rainbowDebug.getLayerVisibility()
  }));
  assert.equal(d.paths,16,"curve count");
  assert.equal(d.meshes,32,"3D TubeGeometry mesh count");
  assert.equal(d.nodes,6,"node count");
  assert.ok(d.body>=12,"body composed of real meshes");
  assert.equal(d.rings,5,"crown rings");
  assert.ok(Object.values(d.layers).every(Boolean),"all layer groups visible initially");
  const canv=page.locator("#scene");
  await page.addStyleTag({content:".topbar,.hint { display:none !important; }"});
  const brightnessChecks=[];
  const shots=[
    ["front","01-code-render-front.png",pos=>Math.abs(pos[0])<0.005&&pos[2]>2],
    ["right","02-code-render-right.png",pos=>pos[0]>2&&Math.abs(pos[2])<0.005],
    ["back","03-code-render-back.png",pos=>pos[2]<-2],
    ["three","04-code-render-45deg.png",pos=>pos[0]>1&&pos[2]>1],
    ["top","05-code-render-top.png",pos=>pos[1]>2]
  ];
  for(const [camera,file,verify] of shots){
    await page.locator('[data-camera="'+camera+'"]').click();
    await page.waitForTimeout(400);
    const state=await page.evaluate(()=>window.__rainbowDebug.getViewState());
    assert.ok(verify(state.camera),"camera preset "+camera+" position "+JSON.stringify(state.camera));
    const buffer=await canv.screenshot({path:dest+"/"+file});
    assert.ok(buffer.byteLength>11000,file+" appears blank/too small ("+buffer.byteLength+" bytes)");
    const png=PNG.sync.read(buffer);
    let bright=0, count=0;
    for(let y=0;y<png.height;y+=12)for(let x=0;x<png.width;x+=12) {
      const i=(y*png.width+x)*4;
      if((png.data[i]+png.data[i+1]+png.data[i+2])/3>215)bright++;
      count++;
    }
    const brightPercent=100*bright/count;
    brightnessChecks.push({view:camera,brightPercent:+brightPercent.toFixed(2)});
    assert.ok(brightPercent<18,file+": bloom washout detected: "+brightPercent.toFixed(2)+"% of sampled pixels nearly white");
  }
  await page.locator('[data-layer="flow"]').uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getLayerVisibility().flow),false,"flow layer toggle");
  await page.locator('[data-layer="flow"]').check();
  await page.locator('[data-layer="nodes"]').uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getLayerVisibility().nodes),false,"nodes layer toggle");
  await page.locator('[data-layer="nodes"]').check();
  await page.locator('[data-layer="crown"]').uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getLayerVisibility().crown),false,"crown layer toggle");
  await page.locator('[data-layer="crown"]').check();
  await page.locator('[data-layer="body"]').uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getLayerVisibility().body),false,"body layer toggle");
  await page.locator('[data-layer="body"]').check();
  await page.locator('[data-layer="bloom"]').uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getViewState().bloom),false,"bloom toggle");
  await page.locator('[data-layer="bloom"]').check();
  await page.locator("#speed").evaluate(el=>{el.value="1.25";el.dispatchEvent(new Event("input",{bubbles:true}))});
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getViewState().speed),1.25,"flow speed");
  await page.locator("#animate").uncheck();
  assert.equal(await page.evaluate(()=>window.__rainbowDebug.getViewState().animating),false,"pause");
  assert.equal(failures.length,0,"browser JS errors: "+failures.join("; "));
  const lines=[
    "# Procedural renderer smoke report",
    "",
    "- Environment: GitHub Actions Ubuntu + Playwright Chromium "+browser.version(),
    "- Verified same scene camera presets: FRONT, RIGHT, BACK, 45°, TOP",
    "- Verified 16 3D curve paths / 32 core+halo meshes, 6 energy nodes, "+d.body+" body mesh components, 5 crown rings",
    "- Verified independent layer toggles: body, flow, nodes, crown, Bloom",
    "- Verified flow speed input and animation pause controls",
    "- Generated 5 source-code-rendered PNG views from one live WebGL scene",
    "- Bright pixel ratios (near-white): "+brightnessChecks.map(x=>x.view+" "+x.brightPercent+"%").join(", "),
    "- **Does NOT establish accuracy against the source artwork or performance acceptability. Stage A/B still DRAFT.**",
    ""
  ];
  writeFileSync(dest+"/REPORT.md",lines.join("\n"));
  process.stdout.write(lines.join("\n"));
}finally{
  await browser.close();
}
