# 02 · Rainbow Flow Body / Code-Ready Pilot (Three.js)

**Review state:** DRAFT — 尚未通过 Stage A / Stage B 准入，不能当作最终复刻或认证 3D 资产。

## 在线预览

- **[打开 Three.js 交互打板](https://bianen.github.io/ui-motion-lab/assets/spiritual-bodies/02-rainbow-flow-body/prototype/)**
- [源代码 HTML](index.html) · [Three.js / GLSL 代码](main.js) · [机器可读参数](../review/asset-spec.json) · [审查记录](../review/README.md)

## 这个打板现在做了什么

- 纯代码生成中性人体近透明 **Mesh**（Lathe、Sphere、Cylinder）；没有载入图片做 3D 贴图，也没有载入 GLB。
- 以 `asset-spec.json` 的 16 条离散空间控制点路径，构建 16 条 `THREE.TubeGeometry` 彩虹曲线及各自的薄发光层。
- 6 个独立三维球状能量节点、锥形头顶光束与 5 个横向光环。
- `ShaderMaterial` 在流线表面实现时域高光；`EffectComposer / UnrealBloomPass` 做发光后处理。
- `OrbitControls` 旋转与缩放，5 个按钮切换同一模型的 Front、Right、Back、Three-quarter、Top 相机位。
- 独立开关 4 类对象和 Bloom；流速与 Bloom 强度可实时修改。
- 通过 `window.__rainbowDebug` 可读取资产编号、曲线/节点数量、层显示状态及摄像机位置。

**重要区别**：这不是从几张图精确恢复的三维人体。背面曲线、节点的 Z 深度、体积厚度和几何拓扑都属人工建模假设。该打板只是探索**能否用代码从此素材体系生成真正的 3D 互动作品**。

## 本地运行

需要 WebGL2 与网络（首次加载固定版本的 Three.js CDN）。因为采用 ES modules 和 `fetch` 读取相邻的 JSON，建议通过 HTTP Server，不要直接双击 `file://`。

```bash
# 从仓库根目录执行
python -m http.server 8000
# 浏览
# http://localhost:8000/assets/spiritual-bodies/02-rainbow-flow-body/prototype/
```

## 人工验收（待执行，不可预先勾选）

- [ ] 在实际浏览器加载，无控制台异常
- [ ] 右键/拖动/触控旋转主体，真实侧背和体积可见
- [ ] Front、Right、Back、Top、45° 均为同一场景改变相机视角
- [ ] 点击 HumanBody、RainbowFlow、EnergyNodes、CrownBeam 的开关会影响相应 3D 对象
- [ ] 流光速度改变时高光速度确实变化，暂停时停止时间步进
- [ ] Bloom 开关及强度改变有明显效果
- [ ] 与原图正面并排比较，记录姿态、流线、节点偏差
- [ ] 记录浏览器/平台/GPU、实际平均 FPS、低端设备渲染能力

测试前不标记为 `Code-Ready Approved`。

## 下一次迭代优先项

1. **配准人体几何**：与 01 共用母模型，人体比例与手臂姿态严格固定。
2. **定义曲线与身体表面的关系**：每条曲线增加宿主面、法线偏移、深度/前后约束，处理 3D 穿模。
3. **建立对照检视页**：原图和程序同框、锁定正面和分离版层渲染，生成可复核差异截图。
4. **改进 Shader**：将 TubeGeometry 逐步升级为带动态表面宽度/透明度的流动发光 Ribbon Mesh；根据参考图校正。
5. **整体验收**：先保留 63/100 暂定评分，证据充分后重新打分，由用户明确确认入库。
