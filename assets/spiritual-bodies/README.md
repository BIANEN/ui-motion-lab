# 数字灵体 · 3D 建模素材库

这里是 **11 种灵体图像 → Blender/Three.js 3D 资产**的编号式可视化索引。

**[打开网页图片画廊（独立图浏览）](gallery.html)** · **[3D Code-Ready 评测规范](3D-ASSET-REVIEW-V1.md)** · **[02 纯代码 3D 实验室](02-rainbow-flow-body/prototype/index.html)**

| 编号 | 形态 | GitHub 预览 | 状态 |
|:--:|---|---|---|
| 01 | [蓝色网光体 / Blue Wireframe Light Body](01-blue-wireframe-light-body/README.md) | [<img src="01-blue-wireframe-light-body/version-A/views/01-front.png" width="130" alt="Blue wireframe light body">](01-blue-wireframe-light-body/README.md) | A版：9张高清原图已入库、SHA-256 已验证 |
| 02 | [彩虹流光体 / Rainbow Flow Body](02-rainbow-flow-body/README.md) | [<img src="02-rainbow-flow-body/previews/01-front.svg" width="130" alt="Rainbow flow body">](02-rainbow-flow-body/README.md) | A版：多视角生成完毕、正式入库待审核；已有 3D 纯代码打板、评分与参数规格 |

## 素材库约定
- 每个形态单独编号、单独目录；每张视角及图层都是独立图像，**不以拼版替代单张资产**。
- `previews/*.svg` 是基于已生成图片制作的低分辨率浏览图，不是高清建模图。
- 01 的高清资产已存放在 `source/`、`version-A/views/`、`version-A/layers/`；02 仍只有正面预览，后续逐一补齐。
- 所有正交视图将以同一份三维母模型重新渲染以确保空间一致性。

> The visual preview tiles are lightweight, embedded-image SVG wrappers committed as UTF-8 files so that GitHub can show them in README pages. Spirit Body 01 original raster assets are committed in the repository. Spirit Body 02 remains in preview state.


## 当前 Code-Ready 打板

### 02 彩虹流光体（待验收实验样本）

- [交互 3D 演示](02-rainbow-flow-body/prototype/index.html) · [完整评测](02-rainbow-flow-body/review/README.md) · [机器可读三维参数](02-rainbow-flow-body/review/asset-spec.json)
- 16 条可单独定位的世界坐标流线、6 个独立发光节点、程序化人体、冠部光束和 Bloom；实际入库需用户确认。
- 视觉评估 **63/100（暂定）**；代码实现 ≠ 运行验收 ≠ 正式资产批准。
- 后续所有 11 个灵体采用 [3D-ASSET-REVIEW-V1](3D-ASSET-REVIEW-V1.md) 的六指标评测和两道准入门槛。
