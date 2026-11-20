# Claude × Three.js × Blender Python｜阅读导航（从这里开始）

> 研究版 V1.0 · 2026-11-20。入口建议：优先使用同目录的 `Claude_3D_研究工作台_从这里开始.html`，它内置了全部主提示词、案例和工作流。

## 最佳阅读顺序

| 顺序 | 看什么 | 你会得到什么 |
|---|---|---|
| 1 | **路线概览** | 分清 Three.js 互动网页、Three.js 逐帧视频和 Blender Python 离线视频 |
| 2 | **主提示词 A1 → B1 → C1** | 三套可复制的完整工程说明，决定输出与约束 |
| 3 | **真实开源案例** | 检查可运行代码、项目结构与许可证 |
| 4 | **创作者提示词资源** | 区分公开作者原词与平台再创作 prompt |
| 5 | **W01 → W04 工作流** | 按预览图、代码、逐帧导出、QA 逐步执行 |
| 6 | **蓝色光子人形对照试验** | 同主题验证视觉、性能、可复现性与商业许可 |

## 三条主路线与对应提示词

| 路线 | 用途 | 第一份要读的提示词 | 紧接着研究的代码案例 |
|---|---|---|---|
| Claude + Three.js | 互动光子人形、3D 艺术馆 | A1，之后 A2 | T02 Interactive Particles；T03 danlex Particles；T05 Claude 粒子物理 |
| Claude + Three.js → MP4 | 彩虹流体、程序化动画视频 | B1，之后 B2/B3 | T07 stereoframe；T08 teardown-machines |
| Claude + Blender Python | 程序化 3D、电影级离线输出 | C1，之后 C2/C3 | B01 Blender Python Examples；B02 BlenderProc；B03/B04 Blender MCP |

提示词完整原文见 `Claude_ThreeJS_Blender_工程提示词与视频工作流_2026-11-20.md` 的 §§2–6；四条工作流见原 Excel 的「工作流」工作表。

## 提示词/案例网站：先后顺序

| 顺序 | 网站 | 价值 | 需要留意 |
|---|---|---|---|
| 1 | [motif 3D & Generative](https://createmotion.io/prompts/3d-generative/) | 部分带完整 prompt | 页面承认未重新运行验证；需二次核对 |
| 2 | [awesome-opus-5-5-video-prompts](https://github.com/X-RayLuan/awesome-opus-5-5-video-prompts) | 部分完整原文/中英 | 逐条鉴别是否作者真公开，不把简介当 prompt |
| 3 | [PulKit Claude Directory](https://github.com/pulkitxm/claude-directory) | 项目提示词文件 | 主仓库现有许可与资产审计，需逐项目检查 |
| 4 | [Revid Claude 3D Animation](https://www.revid.ai/claude-3d-animation) | 29 个案例中 3 个作者披露 | Use as prompt 按钮不能直接认作作者原词 |
| 5 | [Three.js 案例库](https://threejs.cc/) | 部分代码示例 | 无法把收录当统一商用许可 |
| 6 | [Three.js 官方 examples](https://threejs.org/examples/) | 完整源码 | 框架 MIT；外部资产许可证另查 |
| 7 | [BlenderProc 官方 examples](https://github.com/DLR-RM/BlenderProc/tree/main/examples) | bpy/BlenderProc Python | GPL-3.0；不是一般 Blender script 开箱即用 |

剩余的 3 个网站和全部 15 个技术案例、许可状态及后续核验事项请看研究工作台或 Excel。

## 原始文件

- 完整工程提示词：`Claude_ThreeJS_Blender_工程提示词与视频工作流_2026-11-20.md`
- 数据库（6 个工作表）：`Claude_ThreeJS_Blender_开源案例对比数据库_2026-11-20.xlsx`
- 统一交互阅读入口：`Claude_3D_研究工作台_从这里开始.html`

**使用边界：** 提示词模板是原创工程写法，不是第三方作者原 prompt；开源项目许可证按当前研究记录整理，复用/商用前应核实项目当前 LICENSE、素材与依赖；原研究并未实际执行全部代码或视频渲染。