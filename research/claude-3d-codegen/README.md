# Claude 3D Codegen Lab | Claude / Three.js / Blender

> Research archive + executable prompting kit · V1.0 · originally researched 2026-11-20
>
> 本目录是 **Claude 写代码与制作 3D 互动网页/程序化视频的可复用资料库**，不是一个已经通过构建与视觉测试的成品应用。

## 从这里开始

**给 Claude Code 的入口：** [CLAUDE.md](CLAUDE.md)  
**给人看的操作指南：** [原始阅读导航](docs/reading-guide.md)  
**可复制的完整工程提示词：** [工程实操手册](docs/engineering-prompts-and-workflows.md)  
**可视化交互式资料页：** [HTML 工作台](workbench/index.html)  
**案例与许可证研究：** [六表格文本化案例库](data/open-source-case-database.md)  
**新项目需求模板：** [scene-brief.template.md](scene-brief.template.md)

### 你要做什么？

| 目标 | 阅读章节 | 主要技术 | 交付 |
|---|---|---|---|
| 图片/brief → 真正可操作的 3D 网页 | A1、A2 / W01 | Three.js + GLSL + TypeScript | 源码 + 浏览器预览 + 验收 |
| 数学/图形算法 → 程序化 MP4 动画 | B1、B2、B3 / W02 | Three.js + Puppeteer + FFmpeg | 逐帧 PNG + MP4 |
| 电影级材质、镜头、模型 → 视频 | C1、C2、C3 / W03 | Blender Python (bpy) + FFmpeg | .py + .blend + MP4 |
| Blender 离线品质 + 网页实时交互 | D / W04 | Blender + glTF + Three.js | 网页 + 视频 + 共享视觉规格 |
| 代码检查与视觉修正 | E / QA | 构建、截图、性能、许可审查 | 可核验的测试结果 |

**推荐顺序：** 先以 A1 试做互动网页，再用 B1 做同主题确定性逐帧视频；真正需要复杂材质、离线灯光与镜头时采用 C1。不要把“纯代码”理解为必须让网页使用 Blender 渲染：Three.js 在浏览器实时运行，Blender 则承担资产与离线渲染。

## 未来直接喂给 Claude 的一句话

```text
Read research/claude-3d-codegen/CLAUDE.md first. Follow it as the project entry point.
Then read the linked full engineering prompt for the relevant track (A1, B1 or C1),
the case database, and scene-brief.template.md. Implement a complete runnable
project, not a plan or mockup. Show actual tests and clearly mark unverified work.
```

在 Claude Code 中打开整个 `ui-motion-lab` 仓库，再粘贴这段指令；Claude 应当能直接读仓库里的相对路径。如果只使用网页版 Claude，请上传 `CLAUDE.md` 和对应的 `docs/engineering-prompts-and-workflows.md`，连同具体需求/参考图一起提交。

## 现有项目衔接

- 主页：[Museum of Fields — Interactive Art Laboratory](../../README.md)
- 粒子人形：[human-mesh](../../experiments/human-mesh/)
- 多视图角色/视觉素材：[spiritual-bodies](../../assets/spiritual-bodies/)
- **3D 资产评分标准（已有文件）**：[3D-ASSET-REVIEW-V1](../../assets/spiritual-bodies/3D-ASSET-REVIEW-V1.md)
- 彩虹体代码打板：[02-rainbow-flow-body](../../assets/spiritual-bodies/02-rainbow-flow-body/)

这些是现有研究与试验入口；**不要把提示词库误认作项目源代码**，或将彩虹体打板当成完成了最终 3D 精确复刻。

## 目录结构

```text
research/claude-3d-codegen/
├── README.md                            # 人类入口/使用说明
├── CLAUDE.md                            # AI 编程代理的指令与阅读顺序
├── scene-brief.template.md              # 每个新场景可复制的需求表
├── docs/
│   ├── engineering-prompts-and-workflows.md  # 2026-11-20 原始完整手册
│   └── reading-guide.md                      # 原始阅读导航
├── data/
│   └── open-source-case-database.md     # 原 Excel 六个工作表的可检索文本镜像
└── workbench/
    └── index.html                       # 原始可交互 HTML 工作台
```

## 资料可靠性、授权与安全

- 所有工程 prompt 是 **独立整理的工程模板**，不能冒充第三方创作者公开的原始提示词。
- 开源仓库的 LICENSE、图像/字体/贴图/模型许可必须按实际版本复核。研究库中的“可商用”并非法律保证。
- 所有 FPS、粒子数量、渲染效果及视频产出，默认只是 **目标/设计**；除非提供构建日志、帧图、浏览器测试、FFprobe 或其他实测证据，不要宣称已完成。
- Claude Code / Blender MCP 可能执行代码，先使用隔离目录及最小权限；未经审查不得在含私密文件的目录里执行陌生脚本。
- 原始工作表保存为 ChatGPT Library 的 `Claude_ThreeJS_Blender_开源案例对比数据库_2026-11-20.xlsx`。本仓库的 `data/*.md` 是为了便于 Claude 直接读取而保存的六表格文本镜像，不是原生 XLSX 二进制文件。
