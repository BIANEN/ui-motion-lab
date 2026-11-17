# UI Motion Lab · Favorites / 设计交互收藏库

> 这是我主动收藏、希望以后能够**随时查找、复刻或改造**的网站/技术参考。
>
> 索引是参考知识库而非第三方源码镜像。以下只保存链接、原创摘要、技术路线和许可判断；不自动覆盖项目、下载私有源码或复刻第三方品牌资产。
>
> 创建 / 最近整理：2026-11-17 · 后续可以继续追加 `FAV-004` 等。

## 快速查找

| ID | 收藏内容 | 类型 / 技术 | 可复用原站源码？ | 详细笔记 |
|---|---|---|---|---|
| [FAV-001](001-curve-gallery.md) | **Curve Gallery** | Three.js / GSAP / Blender 曲线 / 滚动相机 | 有公开源码；需核对许可与素材 | [查看](001-curve-gallery.md) |
| [FAV-002](002-when-cells-collide.md) | **When Cells Collide** | Rapier / InstancedMesh / Kawase Blur / 粒子碰撞 | 只有公开技术拆解，**未确认完整源码授权** | [查看](002-when-cells-collide.md) |
| [FAV-003](003-active-theory.md) | **Active Theory** | Hydra / WebGL / 场景式导航 / 电影叙事 | **不可直接复用原站代码与素材** | [查看](003-active-theory.md) |

### 一键入口

- **FAV-001 Curve Gallery**： [原始 Demo](https://tympanus.net/Tutorials/CurveGallery/) · [原作者 GitHub](https://github.com/gaspoorf/curve-gallery) · [本仓库源码归档（独立分支）](https://github.com/BIANEN/ui-motion-lab/tree/reference/curve-gallery-archive/references/curve-gallery)
- **FAV-002 When Cells Collide**： [Unseen Studio 技术解析（Codrops）](https://tympanus.net/codrops/2025/09/11/when-cells-collide-the-making-of-an-organic-particle-experiment-with-rapier-three-js/) · [原站 Demo](https://unseen.co/labs/cellular/) · [Demo 调色面板](https://unseen.co/labs/cellular/?gui=)
- **FAV-003 Active Theory**： [官方网站](https://activetheory.net/) · [工作室自述技术文章](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4)

## 按学习主题找

| 主题 | 优先参考 |
|---|---|
| Camera Path / 3D 滚动叙事 | FAV-001、FAV-003 |
| 粒子 / 真实碰撞 / 流体质感 | FAV-002 |
| 电影感空间 / 整站视觉架构 | FAV-003 |
| 独立可改造代码起点 | FAV-001（核对许可，替换第三方图片） |
| NEBULA LAB / 光子物理延伸 | FAV-002 |
| Museum of Fields / 3D 艺术馆 | FAV-001、FAV-003 |

## 权利与使用规则（重要）

**不是“能在网页里打开”就代表“能复制代码、图片、3D 模型直接商用”。**

- **可学习**：自行观察画面和运动规律、用自己的代码实现独立效果。
- **可改造开源代码**：仅在对应仓库/Demo 有明确适用许可时；保留要求的版权与许可文字，并单独核实第三方素材。
- **不可直接照搬**：没有开源授权的源代码、品牌设计、原站图片、视频、3D 模型、字体。
- Codrops 的 [许可页](https://tympanus.net/codrops/licensing/) 针对**可下载 Demo**默认 MIT（另有特别声明的除外），不意味着 Codrops 发布的所有第三方商业网站均为 MIT。
- `FAV-001` 的官方 GitHub 当前缺少独立 LICENSE，Codrops Demo 许可与素材权利应分别核对。保守做法是只用代码作学习基线，并替换图片。
- `FAV-002` 公开了概念、技术文章与片段；当前未核实提供整个项目可下载源仓库；文章本身不得整篇复制进本仓库。
- `FAV-003` 使用工作室自研 Hydra；第三方“克隆 / 逆向分析”仓库的 MIT 声明不会自动赋予使用 Active Theory 原站资产的权利。

## 如何随时调用

打开这个索引，或者在 ChatGPT 中直接说：

- **“调出 UI Motion Lab 收藏 FAV-002，拆解 Rapier 碰撞和渲染的实现。”**
- **“按 FAV-001 的原理，用我们自己的素材建立 3D 艺术长廊。”**
- **“对比 FAV-001 和 FAV-003 的相机叙事，设计 Museum of Fields 首页。”**

每次新增收藏使用下一个编号，补充：原站/源码/技术栈/复用许可/学习点/适用场景/下一步。

> 相关结构化元数据：[catalog.json](catalog.json)
