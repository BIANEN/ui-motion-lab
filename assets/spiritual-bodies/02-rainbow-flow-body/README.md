# 02 彩虹流光体 | Rainbow Flow Body

**Version A · Code-Ready Pilot (DRAFT / 待确认入库)** · [返回资产总目录](../README.md) · [独立图像画廊](../gallery.html)

## 先看这一套“打板”补充资料

| 类型 | 用途 | 入口 |
| --- | --- | --- |
| **可交互三维小样** | 纯代码创建 Human Mesh、16 条流光、6 个光核、头顶白色光束；支持 360° 旋转、五相机位、分层开关 | **[打开 Three.js 在线打板](https://bianen.github.io/ui-motion-lab/assets/spiritual-bodies/02-rainbow-flow-body/prototype/)** |
| **源代码** | 可交给 Claude 继续修改；不含伪 3D 图片贴图 | [index.html](prototype/index.html) · [main.js](prototype/main.js) |
| **3D 参数** | 三维坐标假设、16条 Curve、6个 Node、Shader 控制 | [asset-spec.json](review/asset-spec.json) |
| **六项评估报告** | 63/100 暂定、证据差异、待补图层、验收门槛 | [查看评测报告](review/README.md) |
| **项目级规范** | 以后 01–11 均适用 | [3D-ASSET-REVIEW-V1](../3D-ASSET-REVIEW-V1.md) |

### 现有正面参考图

[<img src="previews/01-front.svg" width="230" alt="02 Rainbow Flow Body generated front preview">](previews/01-front.svg)

**图片状态**：GitHub 中目前仅有正面低分辨率预览。原始设计和新生成的多角度图片仍在候选评测阶段，**尚未按正式入库流程上传高清文件**。这是为了遵守“检测后询问用户，用户确认才将整套候选高清图片归入版本库”的工作方式。

## 当前判断

- **目标**：Claude + Three.js / WebGL 从结构参数纯代码实现 3D 可交互灵体。
- **图像评估**：63/100 暂定；分数是人工研判，不是实际网页测试。
- **打板演示**：代码已加入仓库，使用可调整的三维参数，是后续开发的结构起点。
- **Stage A / Stage B**：都**未正式批准**。运行和截图对照/性能检查必须单独验收。
- **高角度图**：候选辅助角度，不是正交 Top View。

**下一步建议**：实际查看网页打板 → 根据旋转的侧面与背面效果调整 3D 曲线的深度坐标 → 产生统一母模型的真实多视角截图 → 补充原始高清参考图 → 重新评分 → 向用户申请正式入库。
