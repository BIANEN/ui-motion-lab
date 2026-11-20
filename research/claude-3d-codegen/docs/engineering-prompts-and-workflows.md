# Claude + Three.js / Blender Python：工程提示词与代码生成视频工作流

**研究日期：2026-11-20｜版本：V1.0｜语言：中文说明 / 英文可执行提示词**  
**主题**：完全或主要用代码生成 3D 交互网页、程序化动画、可重复渲染的视频。  
**范围说明**：本文件中的工程提示词是基于公开最佳实践与开源代码工作流独立撰写的原创模板，并非声称为任何案例作者发布的原始提示词。真正公开的创作者提示词请通过最后的案例库与源链接检查。

---

## 0. 执行摘要：先按输出反推引擎

| 目标 | 推荐主路线 | 成品 | 理由 |
|---|---|---|---|
| 可实时操作的光子人形和艺术馆 | Claude → Three.js + GLSL | 可部署网页 | 实时 3D、相机、指针交互、粒子模拟 |
| 纯代码抽象动画视频 | Claude → Three.js → 浏览器逐帧 → FFmpeg | MP4 + 可选网页 | 相同代码可驱动任意时间点与镜头 |
| 电影级光照、复杂材质或角色镜头 | Claude → Blender Python (`bpy`) → 图像序列 → FFmpeg | `.blend`、脚本、MP4 | 离线材质、光照、镜头与渲染管线 |
| 同一创作兼顾网页和高质量视频 | Claude → 双端项目 | Three.js 网页 + Blender 视频 | 共享视觉规格，不要求两者渲染结果逐像素相同 |

**重要边界：** Claude 是生成、修改与审查代码的模型；Three.js 是浏览器 3D 库；Blender 是 3D 制作/渲染软件。通过 Blender MCP 可以由 AI 操作 Blender，但 MCP 执行模型编写的代码存在文件与环境安全风险。**当前 V1.0 是研究与模板交付，不是已运行、已渲染或已实际复现下述示例的证明。**

## 1. Claude 工程提示词的九层结构

1. **角色与工作范围**：指定“资深 Creative Technologist / Graphics Engineer / Technical Artist”，并声明需要交付可运行项目，而不是概念性建议。
2. **输出契约**：固定语言、框架、目录、脚本命令、预览图、视频、参数文件、许可清单，禁止省略核心文件。
3. **视觉规范**：明确主体、轮廓、材料、颜色、背景、分镜、光照、视觉情绪、景别与摄影机轨迹。
4. **生成方式与资源约束**：明确纯代码、允许/禁止 GLB/FBX、图片、外部 HDRI、预训练视频、CDN 等。
5. **动画物理**：用具体的时间轴、动力学模型、缓动曲线、速度、接触半径和恢复机制描述行为。
6. **性能预算**：桌面/移动目标 FPS、粒子数量上下限、画质分级、GPU 降级策略，区分目标与实测。
7. **可重复性**：固定随机种子、固定依赖、通过时间 `t` 或帧 `n` 直接计算画面，不依赖墙上时钟或不受控的 deltaTime 累计状态。
8. **验证反馈**：先生成 3–5 张关键帧，检查错误与视觉质量，再生成完整序列；使用截图、日志、内存与性能测试，不谎称测试已通过。
9. **版权合规**：保存原始来源 URL、代码许可证、第三方素材许可证；学习原理但避免把未授权艺术表现像素级复制。

**关于提示词长度**：并非越长越好。比较有效的方法是：一份稳定的工程总规范 + 一份具体场景 brief + 一份反馈修复提示词。可将持续约束写进 `CLAUDE.md`，把每次变化的部分放进 `scene-brief.md`。

---

## 2. 模板 A：Claude + Three.js —— 可交互 3D 光子人形

**用途**：独立运行的商业演示级网页，黑色背景，蓝青色光子人形，鼠标力场、点触冲击波、恢复动画、旋转观察。  
**适用工具**：Claude Code / Claude 在有文件编辑与终端执行能力的开发环境中使用；没有终端时应要求返回完整源文件文本。  
**默认输出**：Vite + TypeScript + Three.js + GLSL，桌面基准优先。

### 可复制主提示词：A1

```text
<role>
You are a senior real-time graphics engineer, generative artist, technical director, and test-driven web developer. Build a complete project; do not stop at planning, pseudocode, or an attractive static mockup.
</role>

<project>
Name: SYNFIELD Photon Human / Interactive Study A
Goal: A completely procedural 3D humanoid made of 30,000 luminous blue-cyan points, floating against a nearly black background. It must be an interactive, maintainable browser artwork that can later be reused for deterministic video rendering.
Audience: A gallery visitor or designer inspecting the work on desktop and mobile.
</project>

<visual_contract>
- 16:9 dark presentation, no default text overlays, centered full-body silhouette.
- Clearly readable head, neck, shoulders, torso, arms, hands, pelvis, legs, and feet from front, side, and three-quarter views.
- Shape should feel sculptural and luminous, not like a random point cloud or a generic anatomical mesh with a texture.
- 70% subdued electric blue, 20% bright cyan, 10% soft violet accents; use parameterized palette values rather than hard-coded scattered literals.
- Soft layered glow: bright inner core + dim broad halo, controlled bloom, deep but readable negative space.
- Spatial parallax, 3D depth, subtle breathing motion, gentle orbital drift. Avoid violent unprompted motion.
- Original visual design. Do not reproduce another named artwork, character or distinctive copyrighted composition.
</visual_contract>

<implementation_constraints>
- Tech stack: Vite, TypeScript, latest compatible pinned Three.js version, GLSL shader source modules where needed.
- Construct all geometry and initial particle positions procedurally in code: body sections can be approximated by parameterized ellipsoids, capsules, splines and custom point-sampling functions.
- No imported GLB/GLTF/FBX, stock art, video textures, downloaded human body assets or third-party copyrighted imagery.
- Use BufferGeometry / Points / ShaderMaterial or a justified GPU-friendly alternative. Avoid one Mesh per particle.
- Use spatially local forces and stable deterministic random initialization with a configurable seed.
- Implement correct resize handling, dispose(), cleanup, and WebGL capability fallback.
- Prefer a modular source structure over one giant HTML file.
- Pin dependency versions and record all runtime dependencies and licenses.
</implementation_constraints>

<behavior_contract>
- Idle: extremely slow breathing, coherent particle drift, low-amplitude noise, occasional local light pulses.
- Pointer hover: only particles near the 3D/2D interaction target are affected; smoothly ease into repulsion and return.
- Click/tap: a bounded local shockwave (not whole-body explosion). Particle velocities should decay smoothly and the original morphology should reconstruct.
- Orbit control: allow examination from front, side, and 3/4 viewpoints; prevent camera clipping and disorienting rotations.
- Expose a compact debug panel (hidden by default in gallery mode) for particle count, bloom strength, point size, idle noise, shockwave radius, repulsion, return spring, and color palette.
- Support keyboard and touch; respect reduced-motion preference.
</behavior_contract>

<performance_targets>
- Desktop target: 60 FPS on a reasonable modern GPU at 1080p, but do not report a target as measured performance.
- Preview quality: 8k–12k particles, moderate bloom. High quality: 30k particles; optional experimental 50k mode.
- Mobile: adaptive pixel ratio, fewer particles, lower bloom, and no unnecessary full-resolution postprocessing.
- When frame time exceeds threshold for sustained periods, reduce quality progressively rather than freezing.
</performance_targets>

<deterministic_export_contract>
Implement a public scene control API:
  window.__art = {
    ready: Promise<boolean>,
    duration: number,
    fps: number,
    seek: (timeSeconds: number) => Promise<void>,
    setQuality: (mode: 'preview'|'high') => void,
    getConfig: () => object
  };
- All base animation and camera states for export must be computed from explicit time t and fixed seed.
- When export/capture mode is enabled, disable live user input and do not advance animation via wall-clock time.
- The seek() call must update all visual state and render a finished frame before its Promise resolves.
- Avoid accumulating unbounded velocity state across seeks. If a simulation requires stateful integration, implement deterministic reset-and-replay or a precomputed cache and document the tradeoff.
</deterministic_export_contract>

<project_files>
Provide at least:
package.json, package-lock.json, index.html, tsconfig.json, vite.config.ts,
src/main.ts, src/scene.ts, src/particleBody.ts, src/shaders/vertex.glsl,
src/shaders/fragment.glsl, src/interaction.ts, src/config.ts,
src/exportApi.ts, src/quality.ts, styles.css, README.md,
LICENSES.md, and a small browser smoke test.
</project_files>

<workflow>
1. Summarize the scene architecture in under 300 words, then build the actual project.
2. Implement the initial static silhouette and camera first; do not add motion until the body shape reads correctly.
3. Implement particles and shader glow; verify front/side/3-quarter screenshots.
4. Add pointer forces, click shockwave and reconstruction without sacrificing silhouette readability.
5. Implement deterministic seek and capture mode.
6. Run install/build/smoke checks where the environment supports them. Report the commands and actual outputs. Never invent test results or screenshots.
7. Deliver a known-issues list and prioritized next iteration recommendations.
</workflow>

<acceptance_tests>
- npm install and npm run build complete without TypeScript/runtime errors.
- The project serves locally, the main viewport is not blank, and browser console has no uncaught errors.
- On click, only a local area scatters; it visibly returns to the form.
- Fixed seed and time produce visually consistent frames after reload and repeated seeks.
- Camera can show a coherent silhouette from multiple viewpoints.
- Mobile reduced quality mode is functional.
- No external 3D model or video asset is loaded.
</acceptance_tests>

<response_format>
Return (1) architecture, (2) complete changed file paths and code, (3) exact install/run/build steps, (4) verification evidence/limitations, (5) tuning knobs, (6) next iteration suggestions. If execution is unavailable, explicitly say what was not run.
</response_format>
```

### A2：三轮修正，而不是重复“更高级一点”

第一轮——轮廓：

```text
Review the current rendered front, left-side and 3/4 screenshots. Identify five specific morphology problems (proportions, shoulder/arm segmentation, hands, legs, depth). Change only particle sampling, body transforms and camera framing. Preserve existing interaction behavior. Show before/after screenshot paths and exactly which parameters changed; if you cannot access screenshots, request or generate them and state this limitation.
```

第二轮——质感：

```text
Keep all geometry and timing unchanged. Improve depth readability, point-size attenuation, halo softness, bloom clipping and blue/cyan contrast. Avoid overexposure, excessive purple or a solid neon outline. Render the same fixed-time test frames before and after. Report GPU cost and any quality compromises.
```

第三轮——交互：

```text
Keep the composition and colors unchanged. Diagnose whether pointer interaction is too broad, too abrupt or too slow to settle. Refine contactEase, radius, spring force, damping and time-to-rest. A click must never disperse most of the body. Test three clicks at separate body locations and confirm a bounded, smooth reconstruction.
```

---

## 3. 模板 B：Claude + Three.js —— 纯代码高质量动画视频

**用途**：10–30 秒程序化艺术视频，支持可靠的 MP4 导出。关键不在“请求生成视频”，而在要求其建立**可定位的时间轴和逐帧渲染管线**。

### 可复制主提示词：B1

```text
<role>
You are a creative coding filmmaker, Three.js graphics programmer, motion designer, and rendering pipeline engineer. Deliver a complete reproducible code-to-video project with editable animation and actual export commands.
</role>

<film_brief>
Title: Iridescent Flow / Study B
Duration: 12.0 seconds
FPS: 30
Frames: 360, numbered 0 through 359
Output: landscape 1920x1080 MP4, H.264/yuv420p, plus selected PNG stills.
Scene: An original, suspended 3D sculpture made of layered rainbow fluid ribbons that twist, fold, separate and reunite against a dark studio background.
No stock video, footage, external 3D models, copyrighted logos or third-party textures.
</film_brief>

<storyboard>
0.0–2.0 s: Wide establishing shot; the sculpture emerges slowly from darkness.
2.0–5.0 s: The camera arcs toward a 3/4 view; the ribbons separate and reveal translucent depth.
5.0–8.0 s: Peak transformation; controlled folding, light sweeps, reflections and subtle motion trails.
8.0–10.5 s: The ribbon strands reconverge into a more coherent form; camera eases closer.
10.5–12.0 s: Smooth visual resolution; avoid a hard final-frame jump. Optionally support loop-safe parameter matching.
</storyboard>

<technical_contract>
- Use Vite + TypeScript + Three.js and parameterized shader logic for iridescence, normals, highlights and color evolution.
- Procedural meshes may use tube/spline surfaces, instancing, or deformable ribbon grids.
- Main timeline MUST be pure or reproducibly seekable: renderAt(frameIndex) computes t = frameIndex / 30 without wall-clock dependencies.
- Keep random seeds fixed. No uncontrolled random calls during frame rendering.
- Freeze interaction in capture mode; composition must be identical irrespective of machine speed.
- Expose window.__film.ready and window.__film.seek(t) to a headless browser automation script.
- A capture script launches a local server and Chromium/Puppeteer, sets viewport and deviceScaleFactor, seeks each frame, waits for rendering, takes PNG screenshots, and uses FFmpeg for encoding.
- Implement restart/resume, explicit output folder, logging and a small set of inspection stills.
- If WebGL hardware acceleration in headless mode is unavailable, give a documented local fallback and an honest warning about speed/quality differences.
</technical_contract>

<camera_and_rendering>
- Precisely parameterize focal length/FOV, orbital path, focus target, distance and camera easing.
- Add layered key/fill/rim lighting appropriate for physically inspired materials.
- Avoid visible jitter, accidental camera clipping, near-plane intersections and temporal discontinuities.
- For postprocessing, use bloom carefully; specify handling of color space/tone mapping and export gamma consistency.
</camera_and_rendering>

<deliverables>
1. Full source tree and explicit pinned dependency versions.
2. A readable film timeline data model and reusable renderAt(n) implementation.
3. npm scripts: dev, build, stills, render-video, smoke-test.
4. Render scripts using Puppeteer/Chromium and FFmpeg; export 0/25/50/75/last% checkpoints before the full render.
5. An MP4 encoding command and exact output directory naming.
6. A VIDEO_QA.md listing visual discontinuities, frame count, codec, audio policy, and reproduction tests.
7. A small config file controlling duration, fps, resolution, palette, quality and particle/ribbon detail.
</deliverables>

<acceptance_tests>
- 360 frame images or a completed 360-frame encoded video; video metadata reports 12s at 30fps (allow container timebase nuances).
- Repeated capture of frame 120 uses the same time and visually matches within documented renderer tolerance.
- Four checkpoint stills show the requested narrative beats.
- Build passes. No missing resource requests and no uncaught JavaScript errors.
- The workflow can be resumed after an interrupted frame render.
- Never state the MP4 exists unless it was actually generated and verified.
</acceptance_tests>

Start with a short work plan, implement the runnable repository, execute available tests, correct failures, and report exact paths to created files.
```

### B2：参考画面复现提示词（更适合学习网站案例）

```text
I will attach a reference image or a link to a visual case. Study it as inspiration for graphics techniques, not as permission to copy the original artwork. First describe: silhouette topology, depth layers, material behavior, camera, lighting, temporal behavior, and what evidence is missing. Propose an original design that shares the underlying technique but has a distinguishable composition, motion choreography and palette. Implement the original design procedurally in Three.js, render five matching camera checkpoints, compare with the written specification, and iterate until measurable discrepancies shrink. Include a source-and-license ledger. Do not claim access to any source code or prompt you have not opened.
```

### B3：实际渲染流程（通用示意）

```bash
npm install
npm run dev
npm run build
npm run stills       # 关键帧检查
npm run render-video # Puppeteer/Chromium 逐帧 -> PNG -> FFmpeg -> MP4
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate,nb_frames -of json output/final.mp4
```

以上命令需由 Claude 生成的 `package.json` 真正定义，**不是**所有 Three.js 项目默认自带。通用 FFmpeg 示例：

```bash
ffmpeg -framerate 30 -i 'output/frames/frame_%05d.png' -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart output/final.mp4
```

`frame_00000.png` 到 `frame_00359.png` 对应 360 帧。若源项目使用从 `00001` 开始编号，应同时更改 FFmpeg 的 `-start_number`。

**注意**：`t = frame / fps` 的可定位画面通常比“开始录屏后播放 12 秒”更适合重复渲染。含粒子物理模拟时，单纯固定随机种子还不够；必须避免非确定性积分路径。

---

## 4. 模板 C：Claude + Blender Python —— 程序化电影级 3D 视频

**模式**：先由 Claude 生成 `.py`，然后 Blender 的 `bpy` 解释器在后台创建、保存、渲染场景；也可以通过 Blender Lab MCP 或第三方 MCP 从 AI 直接触发 Blender。  
**注意**：MCP 通常意味着 AI 可执行 Python 或操作项目文件。应使用独立工作目录、测试机器/容器和最小权限，先预览再正式运行。

### 可复制主提示词：C1

```text
<role>
You are a senior Blender technical director, procedural modeling artist, shader artist, and Python automation engineer. Produce a runnable Blender 5.x Python project and reproducible rendered video output. Do not give a generic tutorial instead of executable code.
</role>

<scene_brief>
Project: Photon Figure / Cinematic Study C
Visual subject: An original semi-transparent humanoid silhouette expressed as a cloud of luminous points, layered filament strands and soft luminous volumes.
Mood: restrained futuristic installation art, dark studio space, high contrast, luminous blue/cyan highlights, subtle violet accents.
Shot: 10 seconds, 24fps, 240 frames, 1920x1080.
Camera: slow 3/4 orbit and short dolly-in, ending in a clean close three-quarter view.
</scene_brief>

<modeling_contract>
- Build the body and spatial filament layout programmatically using bpy, Python math and seeded NumPy/random only if supported in the target Blender Python environment.
- Approximate anatomy using reusable components or parameterized cross-sections and splines; expose proportion controls.
- Prefer mesh instancing, Geometry Nodes or point cloud-compatible strategies instead of tens of thousands of independent bpy objects.
- No downloaded human meshes, FBX/GLB, textures, HDRI or prerecorded footage by default.
- Create reusable functions: reset_scene(), create_body(), create_filaments(), create_materials(), create_lights(), create_camera(), animate_scene(), configure_render(), verify_scene().
- Organize generated objects into named collections, with deterministic object naming and seed-based generation.
</modeling_contract>

<materials_lighting>
- Build materials using Blender shader nodes through bpy.
- Make the emissive core visible without clipping or turning the whole silhouette into a flat glow blob.
- Balance a dim neutral environment, soft key, colored rim and subtle fill for readable form.
- Use Cycles for final quality and a faster preview mode with a supported engine for the selected Blender version.
- Set explicit color management, render samples, denoising, transparent/background settings and output formats.
</materials_lighting>

<animation_contract>
- FPS = 24; frames 1 through 240 inclusive (exactly 240 frames).
- 1–48: reveal torso and head; 49–120: orbit and controlled strand movement; 121–192: particles flow outward locally but retain original identity; 193–240: return to a stable ending composition.
- Use keyframes, procedural drivers or per-frame geometry calculations with reproducible seeds.
- Camera target and near/far clipping must be explicitly configured.
- Avoid temporal popping, mesh intersections, and noise flicker.
</animation_contract>

<delivery_contract>
Output these files inside an explicit project directory:
  scene.py
  config.json
  outputs/photon_figure.blend
  outputs/preview/frame_0001.png, frame_0120.png, frame_0240.png
  outputs/frames/frame_0001.png ... frame_0240.png
  outputs/photon_figure_1080p24.mp4
  README.md
  RENDER_REPORT.md
  LICENSES.md
- Save .blend before initiating full rendering.
- Render image sequences to PNG and use a separately documented FFmpeg command for MP4; do not depend solely on fragile direct-to-video render if interruption recovery matters.
- Support --preview / --final or equivalent config switches with reduced samples and output resolution in preview.
- Log Blender version, renderer, samples, CPU/GPU selection, render duration, output frame count, failures and actual output paths.
</delivery_contract>

<verification>
- Run script syntax and Blender execution if available. Never claim to have run Blender without a real Blender runtime.
- Verify named collections, material nodes, object counts, camera target, frame range and output directory.
- Produce three preview stills first; inspect anatomy, camera framing and glow/exposure.
- Only after stills pass, render full sequence, assemble MP4, and validate codec/duration/frame rate with ffprobe.
- If the environment cannot render, provide exact commands and a truthful NOT RUN status.
</verification>

<response_format>
Return (1) scene architecture; (2) full Python source, config, and project files; (3) exact commands; (4) QA report with factual execution status; (5) render-cost estimate explicitly labeled as an estimate; (6) next art-direction knobs.
</response_format>
```

### C2：Blender 程序化建模的额外质量提示词

```text
Inspect the generated Blender scene using three fixed cameras (front, side and three-quarter). Do not use an image-generation model to invent missing screenshots. Identify proportion and geometry problems from actual renders, then patch only the procedural geometry functions. Re-run the same frame numbers and camera settings, preserving materials and animation. Produce a before/after table of changed parameters and observed differences. Keep collection names stable so the .blend project remains editable.
```

### C3：Blender 动画与输出的命令示例

```bash
# 由脚本创建整个场景；-- 后面参数由 scene.py 自行解析
blender --background --python scene.py -- --preview

# 已有 .blend 文件后，由 Blender 批量渲染 1-240 帧
blender --background outputs/photon_figure.blend --render-output '//frames/frame_####' --render-format PNG --render-anim

# 图像序列编码；注意从 1 开始
ffmpeg -framerate 24 -start_number 1 -i 'outputs/frames/frame_%04d.png' -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart outputs/photon_figure_1080p24.mp4

# 验收
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate,nb_frames -of json outputs/photon_figure_1080p24.mp4
```

`blender` CLI 路径与具体选项以目标版本为准；如果用脚本自行完成 `bpy.ops.render.render(animation=True)`，无需再重复 CLI 的整段动画渲染。BlenderProc 的 `blenderproc run scene.py` 是专门针对 BlenderProc 脚本的运行入口，**不要**与一般 `bpy` 脚本混为一谈。

---

## 5. 模板 D：混合管线——Blender 提供资产，Three.js 提供交互

当必须兼顾高精度物体造型和网页流畅交互时，不必坚持“所有东西只能纯代码”。允许 Blender 程序化创建原始资产并导出 GLB，再让 Three.js 负责实时渲染；如果强调全代码，则模型的生成过程仍可完全脚本化。

```text
Design a reproducible hybrid pipeline for a cinematic 3D art installation:
A. Blender Python is the procedural asset authoring and offline render environment.
B. Three.js is the real-time interactive viewer and visitor interaction layer.
C. The shared visual specification lives in scene-spec.json (units, axes, colors, composition, object names, camera framing, animation beats and timing).
D. Export only assets that benefit from baked geometry; keep effects such as pointer forces and particles procedural in the browser.
E. Test GLB transform units, normals, materials, texture provenance, color management, animation playback, download size and loading time.
F. Produce an independent Blender video preview and an interactive web build, then compare them using the same camera viewpoints.
G. Give the licensing status for every downloaded dependency and asset; default to original generated assets.
H. Report what can and cannot match between offline Cycles rendering and real-time WebGL/WebGPU.
```

---

## 6. 模板 E：把 Claude 变成“多轮自我验收”的生产流程

**使用场景**：当 Claude 返回了代码但实际效果不符合参考或运行失败时。给出真实控制台输出和真实截图，避免只说“优化一下”。

```text
You are now the QA and repair lead for the existing codebase. Keep the original project goal and architecture unchanged unless a blocking issue requires a documented exception.

Inputs: repository tree, package versions, current files, console/build logs, screenshots, expected storyboard, source-license ledger.

Round 1 / Structural audit: List what is already implemented, what is missing, what is broken, and what is unverified. Do not infer successful execution from code alone.
Round 2 / Reproduction: Run the smallest failing command or inspect supplied evidence; identify root causes ranked by impact.
Round 3 / Minimal patch: Change only the necessary code or config, preserving stable APIs and files.
Round 4 / Visual evidence: Capture fixed camera/time screenshots and compare composition, timing, shape and glow with the specification. Do not claim a visual match if no image was inspected.
Round 5 / Regression: Run build and smoke tests, exercise click/touch, inspect memory or resource cleanup, capture frame consistency, and verify MP4 metadata if video output was made.

Deliver a concise table: problem, severity, evidence, fix, verification status, remaining limitation. Separate Passed, Failed, and Not Run. Never declare the project complete merely because code was generated.
```

---

## 7. 建议的项目结构与质量门槛

```text
creative-coding-lab/
  CLAUDE.md                 # 不变的工程规范与版权边界
  briefs/
    photon-human.md        # 当次视觉需求、故事板、可调参数
    rainbow-film.md
  shared/
    scene-spec.json        # 背景、色板、镜头、时间与规格
    licenses.csv           # 代码/图像/字体/模型/音频授权记录
  threejs/
    package.json
    src/
    scripts/render.mjs
    output/stills/
    output/frames/
    output/video/
  blender/
    scene.py
    config.json
    output/stills/
    output/frames/
    output/video/
  qa/
    test-matrix.md
    shot-comparison.md
    render-report.md
```

### 推荐验收矩阵

| 维度 | 评估办法 | 必要证据 |
|---|---|---|
| 可运行性 | `npm run build` 或 Blender CLI 完整退出 | 日志、退出码 |
| 美术质量 | 固定前/侧/三分之四视角 + 关键帧 | 实际截图 |
| 时间准确性 | 帧数、帧率、总时长、起止帧 | ffprobe / 文件清单 |
| 确定性 | 相同时间/种子两次渲染 | 截图差异 / 报告 |
| 性能 | 1080p 目标设备 FPS、内存、显存 | 实测，而非估算 |
| 交互性 | 鼠标、触摸、点击、相机复位 | 录制操作或自动化测试 |
| 可维护性 | 模块化、参数化、版本固定 | 目录与配置 |
| 可商用性 | 依赖代码、资产、字体、音乐许可证 | 来源和许可记录 |

评分建议（仅用作内部测评方法，不宣称已测）：视觉 30%、可执行性 20%、视频重复渲染 15%、交互 15%、性能 10%、可维护性/许可 10%。不同项目可调整权重。

---

## 8. 真实公开案例与网站索引

下面网站分四类：**P = 有原始提示词**（平台引自作者帖子，仍需复核原帖）；**R = 有项目目录及 prompt.md**；**D = 有源代码或 demo 但不一定有作者提示词**；**G = 作品展示/平台自带再创作 brief，不能冒充作者原始提示词**。

### Prompt / 视频案例网站

| 网站 | 类型 | 资料特点 | 需要注意 |
|---|---|---|---|
| [motif / 3D & Generative](https://createmotion.io/prompts/3d-generative/) | P | 页面标注 2026-11-14 更新、39 条创作者公开提示词，含 Three.js / Blender | 来源与模型标签为网站归档，页面表示未重新运行验证 |
| [awesome-opus-5-5-video-prompts](https://github.com/X-RayLuan/awesome-opus-5-5-video-prompts) | P / 归档 | 按类别记录创作者披露的提示词与未公开情况，部分中英双语 | 逐条对照原始帖子，不把整理者解读当原文 |
| [PulKit Claude Directory](https://github.com/pulkitxm/claude-directory) | R | AI 辅助的 UI / 3D / shader 实验和来源、授权审核 | 请以当前主仓库的许可范围与审计文档为准；不要把 fork 的描述等同于授权 |
| [Revid Claude 3D Animation](https://www.revid.ai/claude-3d-animation) | G / 部分 P | 29 个 Blender / Three.js 视频案例与创作者标注 | 页面明确仅 3 位原作者分享提示词，按钮里的 brief 可能是平台再创作版本 |
| [DojoClip / Code-to-video](https://www.dojoclip.com/en/code-to-video) | G | 可观看 3D / SVG 代码动效、获取起始 brief | 平台自有示例，无法假设是原始 Claude 提示词 |
| [Three Websites That React to You](https://www.farazfarid.com/free/reactive-3d) | R / 下载 | 3 套 Claude Code + Three.js 网站 demo、提示词与源码 | 下载可能需要提供邮箱；不是直接公开的网页全文 |
| [Three.js 案例库](https://threejs.cc/) | G | 大型 3D 交互案例索引 | 展示权和商用许可不能统一推断 |

### 开源技术案例（优先深入）

| 项目 | 技术 | 学习重点 | 授权/限制 |
|---|---|---|---|
| [three.js 官方](https://github.com/mrdoob/three.js) | JS / WebGL | 真实范例、Renderer、相机与动画循环 | MIT；具体项目所用外部素材另查 |
| [Interactive Particles / Bruno Imbrizi](https://github.com/brunoimbrizi/interactive-particles) | Three.js / GLSL | 鼠标触碰通过离屏纹理驱动粒子交互 | README 允许集成到个人/商业项目，但禁止原样转售或再发布；检查依赖和图像 |
| [Particles / danlex](https://github.com/danlex/particles) | Three.js / GPGPU | 大规模 GPU 粒子、吸引子、交互实时参数 | MIT；README 中图库数量与仓库简介不一致，以实际版本为准 |
| [three-particles / NewKrok](https://github.com/NewKrok/three-particles) | Three.js / GPU | 粒子发射、轨迹、可配置系统及 WebGPU | 仓库页面标注 MIT；各实例依赖另查 |
| [particle-simulation / Robertndrei](https://github.com/Robertndrei/particle-simulation) | Three.js / WebGPU | 作者称 Claude 生成；大量粒子、交互力场 | MIT；README 自述 Claude Opus 4.5，不代表提供原提示词 |
| [stereoframe](https://github.com/kiyeonjeon21/stereoframe) | Three.js / Puppeteer / FFmpeg | 确定性求值、逐帧 MP4，视频与网页预览 | MIT；值得直接研究渲染协议 |
| [teardown-machines](https://github.com/ArcGG33/teardown-machines) | Three.js / Puppeteer / FFmpeg | 拆解动画、时间轴定位、检查帧、离线编码 | 未核实仓库总许可；不能直接视为可商用 |
| [Blender Python Examples / benckx](https://github.com/benckx/blender-python-examples) | Blender / Python | 简单动画、PNG 序列 → GIF/MP4 | 未见明确顶层许可证；先学习，复制需核实 |
| [BlenderProc](https://github.com/DLR-RM/BlenderProc) | Blender / Python | 真实程序化场景、材质、光照、相机、批量渲染 | GPL-3.0；研究与集成时要评估许可义务 |
| [mcp-for-blender](https://github.com/ahujasid/mcp-for-blender) | Blender / MCP | Claude 驱动 Blender、执行脚本、构建场景 | MIT；第三方，非 Blender Foundation 官方项目 |
| [Blender Lab MCP](https://www.blender.org/lab/mcp-server/) | Blender / MCP | Blender 官方实验室发布的 MCP 方案 | 官方提示执行模型代码存在安全风险；隔离环境 |
| [Blender Skills for Claude Code](https://github.com/kevinbadi/blender-skills) | Claude Code / Blender | 运镜技能、转台、推进与工作流 | 部分 3D 资产流程依赖 Meshy API；仓库许可需复核 |

### 两个非常有借鉴价值的原始提示词入口

- **真实作者长提示词**：`motif / 3D & Generative` 中公开含角色设定、分镜、渲染器、生产流程的案例。具体视频的原文请从该页面跳转作者链接，不在本文件整段转录以避免误判原文、归属和复制权。
- **真实作者短提示词**：`awesome-opus-5-5-video-prompts` 中的 *Market Street 1906* 项目把历史来源列表、具体场景边界、代码约束与 10 秒视频要求一次写入。同样的**方法**可迁移到我们自己的艺术馆，不过不要未经授权复制其独特艺术构图。

---

## 9. 推荐首个对照实验（下一次迭代）

**选题**：Blue Photon Body，固定 10 秒、24fps、1920×1080、相同主体轮廓和蓝青色板。

**实验 A / Web**：30,000 粒子的 Three.js 网页，鼠标局部冲击与恢复；输出 3 个静止视角 + 240 帧视频。  
**实验 B / Film**：Blender `bpy` 生成 30,000 个数据点但避免 30,000 个独立 Scene Objects；输出 3 个匹配静止视角 + 240 帧视频。  
**评判**：解剖结构准确度、粒子层次、发光过曝控制、渲染耗时、显存、输出大小、复用成本、许可可追溯性。

**不能提前宣称的成果**：两路线都能成功执行、都能以 60 FPS 实时运行、Cycles 和 WebGL 效果逐像素一致、第三方视频/源码可以商用。这些要依据实际工程实测与许可检查。

## 10. 官方与项目来源（逐条打开核对）

- Anthropic Claude Best Practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic Engineering Prompt Article: https://claude.com/resources/articles/best-practices-for-prompt-engineering
- Three.js Installation: https://threejs.org/manual/pages/installation.html
- Three.js Creating a Scene: https://threejs.org/manual/pages/creating-a-scene.html
- Blender Python Quickstart: https://docs.blender.org/api/current/info_quickstart.html
- Blender Render Python API: https://docs.blender.org/api/current/bpy.ops.render.html
- Blender Lab MCP (official): https://www.blender.org/lab/mcp-server/
- Blender Lab MCP source: https://projects.blender.org/lab/blender_mcp
- BlenderProc: https://github.com/DLR-RM/BlenderProc
- BlenderProc Examples: https://github.com/DLR-RM/BlenderProc/tree/main/examples
- Three.js Capture Pipeline: https://github.com/kiyeonjeon21/stereoframe
- Three.js Teardown Pipeline: https://github.com/ArcGG33/teardown-machines
- Prompt sources: https://createmotion.io/prompts/3d-generative/ ; https://github.com/X-RayLuan/awesome-opus-5-5-video-prompts

**最后更新：2026-11-20。** 该案例列表不是实时许可证保证，也不是对所有第三方代码与视频进行过法律审查。