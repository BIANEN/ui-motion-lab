# Claude 3D Codegen — source spreadsheet textual export

> This is a **searchable text mirror** of the six sheets extracted from `Claude_ThreeJS_Blender_开源案例对比数据库_2026-11-20.xlsx` (research date 2026-11-20). It preserves the source extraction with CSV-like rows, tab headings and source URLs; it is not a workbook with formulas or spreadsheet styling.
>
> **Caution:** listed licenses and prompt provenance are provisional research notes. Recheck current upstream source, license and assets before reuse/commercial deployment.

```text
<PARSED TEXT FOR SHEET: 1 / 6 TABS
TAB NAME: 研究总览>
index,CODE-TO-3D  |  提示词 × 开源案例研究库,Unnamed: 1
0,V1.0 · 2026-11-20 · Claude + Three.js / Blender Python · 面向可复用的商业互动艺术研究,
1,,
2,开源技术案例,15
3,案例/提示词网站,10
4,工程工作流,4
5,可复制模板索引,8
6,调查日期,2026-11-20
7,,
8,使用说明与事实分级,
9,,
10,• 先从【提示词索引】找 A1/B1/C1；对应英文完整原文在随附 Markdown 文件。,
11,• 【开源案例】记录实际仓库、技术重点、许可状态与对我们项目的优先级。高优先不等于可直接商用。,
12,• 【提示词网站】区分作者原词、仓库 prompt.md、平台再创作 brief 与纯展示站。,
13,• 【工作流】是实际制作 SOP；每条都规定了成品、命令、测试与风险。,
14,• 标“未核实”的许可、提示词来源和执行结果，不应擅自升级为“已授权”或“已复现”。,
15,• 本文件是研究索引，不是源代码审计、法律意见，也不是已经执行过的渲染测试报告。,
<PARSED TEXT FOR SHEET: 2 / 6 TABS
TAB NAME: 开源案例>
index,01 / 开源案例对比,Unnamed: 1,Unnamed: 2,Unnamed: 3,Unnamed: 4,Unnamed: 5,Unnamed: 6,Unnamed: 7,Unnamed: 8,Unnamed: 9,Unnamed: 10,Unnamed: 11,Unnamed: 12
0,15 个可访问的技术案例；单独注明原始提示词是否公开以及商用条件,,,,,,,,,,,,
1,,,,,,,,,,,,,
2,ID,方向,项目,技术栈,原始提示词状态,源码,许可/商用判定,对我们最适合,关键技术,优先级,项目链接,已查证依据,后续核验
3,T01,Three.js,Three.js 官方 examples,Three.js/WebGL/WebGPU,否；技术范例,是,MIT（框架；素材另查）,基础渲染器与动画架构,相机、场景、Points、Shader、循环,高,https://github.com/mrdoob/three.js,官方代码库含 examples；不是 Claude 生成提示词库,复用前查三方贴图、模型与字体
4,T02,Three.js,Interactive Particles / Bruno Imbrizi,Three.js/GLSL/GSAP,否；技术范例,是,附条件商业集成,高密度互动粒子,离屏纹理驱动鼠标/触摸交互,很高,https://github.com/brunoimbrizi/interactive-particles,README 明许嵌入个人/商业项目；禁止原样销售/再发布,不按通用 MIT 理解；依赖素材另查
5,T03,Three.js,Particles / danlex,Three.js/GPGPU/GLSL,未见原始提示词,是,MIT（仓库标注）,GPU 粒子分布与动态,吸引子、65536 粒子、鼠标交互,很高,https://github.com/danlex/particles,页面简介 61 个，README 正文称 115 个动画；版本存在数字差异,下载后按具体版本核对
6,T04,Three.js,three-particles / NewKrok,Three.js/WebGPU/TSL,未见原始提示词,是,MIT（仓库标注）,粒子引擎能力,轨迹/粒子发射、50K–350K GPU 计算（项目自述）,高,https://github.com/NewKrok/three-particles,带在线编辑器和 CodePen 示例,高粒子数为项目宣称，需实测
7,T05,Three.js,particle-simulation / Robertndrei,Three.js/WebGPU/Worker,仓库称 Claude 构建；未见原提示词,是,MIT（仓库标注）,Claude 生成的粒子物理案例,吸引/排斥、GPU 力场、交互,很高,https://github.com/Robertndrei/particle-simulation,README 自述用 Claude Opus 4.5 生成,不代表完整提示词公开
8,T06,Three.js,particles-playground / isladjan,Three.js/GSAP/GLSL,未见原始提示词,是,代码 MIT；图片需另查,图像转粒子与触屏,自定义着色器、尾迹、触摸交互,中高,https://github.com/isladjan/particles-playground,README 说明图片来自 Flickr 且归原权利人,不可把内含图片当 MIT 素材
9,T07,Three.js→视频,stereoframe,Three.js/Puppeteer/FFmpeg,未见作者原提示词,是,MIT（仓库标注）,确定性代码生成 MP4,seek(t)、逐帧视频、GLB 对比,很高,https://github.com/kiyeonjeon21/stereoframe,README 提供 seek 协议、lint/validate/render 命令,我们的最佳视频管线参考
10,T08,Three.js→视频,teardown-machines,Three.js/Puppeteer/FFmpeg/GSAP,有 CLAUDE.md；非完整原提示词证据,是,未核实,拆解动画和 MP4 帧输出,镜头时间轴、检查帧、离线渲染,高,https://github.com/ArcGG33/teardown-machines,README 给出 npm run stills/render、capture seek,可研究流程；先核许可再复制代码
11,T09,Claude→Web,PulKit Claude Directory（主仓库）,React/Three.js/GLSL/Claude,项目有 prompt.md（需逐个看）,是,分项目/素材审查，需逐个核验,提示词与网页源码配对,交互 3D、shader、UI 页面,很高,https://github.com/pulkitxm/claude-directory,当前主仓库含来源与许可审查提示；旧 fork 的宽泛介绍不可替代当前许可,审查 removed/withdrawn asset 状态
12,B01,Blender Python,Blender Python Examples / benckx,Blender/bpy/FFmpeg,否；脚本范例,是,未核实,简单代码动画视频,Python 动画、PNG → MP4,高,https://github.com/benckx/blender-python-examples,README 有 Blender CLI 和 ffmpeg 命令,尚未看到明确顶层 LICENSE
13,B02,Blender Python,BlenderProc2,Blender Python/Render,否；脚本范例,是,GPL-3.0,程序化场景与批量渲染,材质、灯光、相机、数据输出,很高,https://github.com/DLR-RM/BlenderProc,GPL-3.0 证据在仓库主页；入口 blenderproc run,研究、集成、再分发分别评估
14,B03,Claude→Blender,mcp-for-blender（社区）,Blender/MCP/bpy,README 有 demo 指令；非完整原提示词,是,MIT（仓库标注）,Claude 控制 Blender,直接操纵场景、执行脚本、渲染,很高,https://github.com/ahujasid/mcp-for-blender,仓库明确声明第三方，非 Blender Foundation,执行 LLM 代码，应先隔离测试
15,B04,Claude→Blender,Blender Lab MCP,Blender/MCP/bpy,官方使用示例；需单独核,是,需核对项目许可证,Blender 官方实验室 MCP 路径,Claude/智能体调用 Blender,很高,https://www.blender.org/lab/mcp-server/,Blender.org 官方页面强调执行模型代码的风险,不要给真实项目目录和敏感文件权限
16,B05,Claude→Blender,Blender Skills / kevinbadi,Claude Code/Blender MCP,有 skills 文档（非原作者视频提示词）,是,未核实,3D 产品和运镜提示模板,turntable、dolly、crane、loop,高,https://github.com/kevinbadi/blender-skills,README 将部分 3D 生成与 Meshy API 绑定,注意 API 成本、素材授权和许可
17,B06,Blender Python,procedural-anime / kvothesson,Blender 5.2/Python/Audio,未见原始提示词,是,未核实,代码生成短视频,镜头配置 JSON、后期合成、音频,中,https://github.com/kvothesson/procedural-anime,README 自述从 Python 到视频合成完整流程,需核实仓库许可和可运行环境
<PARSED TEXT FOR SHEET: 3 / 6 TABS
TAB NAME: 提示词网站>
index,02 / 提示词与视觉案例网站,Unnamed: 1,Unnamed: 2,Unnamed: 3,Unnamed: 4,Unnamed: 5,Unnamed: 6,Unnamed: 7,Unnamed: 8,Unnamed: 9
0,优先查找原始提示词；不要将平台提供的再创作指令误认为作者发出的原始 prompt,,,,,,,,,
1,,,,,,,,,,
2,ID,网站,分类,提示词来源,提示词内容,案例/代码,重要事实,来源等级,网址,风险/备注
3,S01,motif 3D & Generative,公开创作者提示词归档,作者在 X/Reddit 的帖文（网站归档）,部分带完整 prompt,视频及作者链接,39 条；页面标注 2026-11-14 更新,P 原帖归档,https://createmotion.io/prompts/3d-generative/,页面承认未重新运行验证；需二次核对
4,S02,awesome-opus-5-5-video-prompts,社区归档,汇集原帖、标注 verbatim / not shared,部分完整原文/中英,视频/来源帖,可看到 1906 Market Street Blender 示例,P/归档,https://github.com/X-RayLuan/awesome-opus-5-5-video-prompts,逐条鉴别是否作者真公开，不把简介当 prompt
5,S03,PulKit Claude Directory,源代码+提示词配对,仓库 prompt.md（逐个项目）,项目提示词文件,代码/录制 demo,3D/GLSL/WebGL/页面源码,R 项目文件,https://github.com/pulkitxm/claude-directory,主仓库现有许可与资产审计，需逐项目检查
6,S04,Revid Claude 3D Animation,视频陈列/平台再创作,创作者提示词仅个别披露,29 个案例中 3 个作者披露,29 视频/标签,11 Blender + 18 Three.js（页面称）,G；少数 P,https://www.revid.ai/claude-3d-animation,Use as prompt 按钮不能直接认作作者原词
7,S05,DojoClip Code-to-video,平台自己的案例+brief,平台编辑起始 brief,可访问的提示简报,多段 3D/Three.js 视频,Orbital Bloom / Chromatic Tunnel,G 平台 brief,https://www.dojoclip.com/en/code-to-video,提示词是重做入口，结果可能不同
8,S06,Reactive 3D / Faraz Farid,Claude Code demo 下载包,作者声称含三份提示词,粒子/玻璃/滚动镜头提示词,网页最终文件,提供 18k 粒子等细节,R 下载包,https://www.farazfarid.com/free/reactive-3d,可能需邮箱换取下载；未在网页上直接展开全文
9,S07,Three.js 案例库,作品索引,不确定是否原提示词,部分代码示例,可预览案例,Visual Art / 3D 分类,G 作品索引,https://threejs.cc/,无法把收录当统一商用许可
10,S08,Three.js 官方 examples,技术案例,无 Claude 提示词,完整源码,交互 demo,JS/WebGL/WebGPU 等,D 官方代码,https://threejs.org/examples/,框架 MIT；外部资产许可证另查
11,S09,BlenderProc 官方 examples,技术案例,无 Claude 提示词,bpy/BlenderProc Python,部分示例结果,程序化渲染与相机,D 技术代码,https://github.com/DLR-RM/BlenderProc/tree/main/examples,GPL-3.0；不是一般 Blender script 开箱即用
12,S10,BeatAPI Gallery,平台视频/工作流画廊,平台标注 prompts & settings,需逐案例核实,图像/视频,Claude + 3D 类别,G 平台案例,https://beatapi.io/gallery,缺少逐条验证，不当作原始作者提示词证据
<PARSED TEXT FOR SHEET: 4 / 6 TABS
TAB NAME: 工作流>
index,03 / 真实制作工作流,Unnamed: 1,Unnamed: 2,Unnamed: 3,Unnamed: 4,Unnamed: 5,Unnamed: 6,Unnamed: 7,Unnamed: 8,Unnamed: 9,Unnamed: 10
0,分别覆盖交互网页、确定性 Three.js 视频、Blender 离线渲染、双端组合,,,,,,,,,,
1,,,,,,,,,,,
2,ID,路线,输入,工程步骤,技术栈,目标交付,执行方式,验收标准,风险,提示词章节,参考案例ID
3,W01,Claude + Three.js：交互网页,一张视觉 brief + 可选参考,参数化人体粒子→Shader→鼠标力场→相机→性能降级,Vite / TS / Three.js / GLSL,可部署网页 + 源码,npm install; npm run build; 浏览器测试,页面非空；交互局部；多视角比例；移动端降级,GPU 性能/素材版权/Shader 兼容,A1、A2,T02/T03/T05
4,W02,Claude + Three.js：代码视频,12秒、30fps、1920x1080 分镜,seek(t) → 关键帧截图 → 全帧 PNG → FFmpeg,Three.js / Puppeteer / Chromium / FFmpeg,360 PNG + MP4 + 源码,stills; render-video; ffprobe,360 帧/12秒；重复帧可视一致；场景不跳帧,无头 GPU/曝光/非确定性物理,B1、B2、B3,T07/T08
5,W03,Claude + Blender Python：离线视频,10秒、24fps、蓝光人形 brief,bpy 建模→材质→相机→关键帧→预览→Cycles→序列→FFmpeg,Blender Python / Cycles / FFmpeg,scene.py + .blend + 240 PNG + MP4,blender -b -P scene.py; ffmpeg; ffprobe,240 帧/10秒；文件可回放；材料分层,高渲染成本/内存/插件执行风险,C1、C2、C3,B01/B02/B03/B04
6,W04,混合路线：双输出,统一 scene-spec.json,Blender 程序化资产→可选 GLB→Three.js 实时交互；Blender 独立视频,bpy / glTF / Three.js,MP4 + Web 体验,导出检查; build; 两端截图对比,坐标/单位/材质检查；素材许可；共同构图,颜色管理差异/GLB 大小,D,T01/B02
<PARSED TEXT FOR SHEET: 5 / 6 TABS
TAB NAME: 提示词索引>
index,04 / 可复制工程提示词索引,Unnamed: 1,Unnamed: 2,Unnamed: 3,Unnamed: 4,Unnamed: 5,Unnamed: 6
0,所有完整英文 prompt、修正 prompt 与命令都在同名 Markdown 研究报告中,,,,,,
1,,,,,,,
2,编号,引擎,提示词名称,核心内容,边界/约束,输出,报告位置
3,A1,Three.js,互动网页主模板,完整 30k 蓝光粒子人形、局部交互、配置、seek,无模型、无图片,CLAUDE.md + brief,MD §2
4,A2,Three.js,视觉/交互三轮修正,形态、曝光、局部力场,真实截图及测试,追加 prompt,MD §2
5,B1,Three.js→MP4,逐帧视频主模板,12秒/30fps/360帧、Puppeteer/FFmpeg,确定性 t 与种子,全代码 + MP4,MD §3
6,B2,Three.js→MP4,参考案例独立创作,技术原理提取、原创构图、关键帧评估,不复制作者表达,艺术复现 brief,MD §3
7,C1,Blender,bpy 视频主模板,10秒/24fps/240帧、建模至编码,程序化几何和可追踪许可,scene.py + .blend,MD §4
8,C2,Blender,三视图几何修正,仅修比例和生成函数，保留材质,使用真实渲染帧,迭代 prompt,MD §4
9,D,混合,Blender + Three.js,共享规格，GLB 可选、双输出,验证坐标/授权/性能,联合项目,MD §5
10,E,通用,QA 修复循环,结构审计、复现、补丁、截图、回归,真实执行证据,QA 报告,MD §6
<PARSED TEXT FOR SHEET: 6 / 6 TABS
TAB NAME: 优先试验>
index,04 / 建议的 2×2 先导试验,Unnamed: 1,Unnamed: 2,Unnamed: 3,Unnamed: 4,Unnamed: 5
0,,,,,,
1,方向,参照源码,生成任务,规格,首轮验收,注意
2,Three.js 实时,T02/T03/T05,蓝色 30k 光子人形网页,16:9 · 1080p,3 个视角 + 点击局部响应 + FPS 实测,动态剪影与性能等级
3,Three.js 视频,T07/T08,蓝色光子人形电影镜头,10s · 24fps · 240帧,seek(t) 一致性 + MP4 ffprobe,与实时时钟解耦
4,Blender Python,B01/B02,蓝色光子人形程序化模型,10s · 24fps · 240帧,3 张 PNG + .blend + MP4,先单帧检查再渲染
5,交叉验证,三条全部,统一场景对照评估,统一相机/色板/镜头,亮度/细节/成本/版权记录,不要求逐像素一致
```
