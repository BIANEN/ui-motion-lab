# FAV-002 · When Cells Collide

**创作者**：Unseen Studio  
**文章时间**：2025-09-11  
**类型**：有机粒子 / 物理碰撞 / 流体视觉 / WebGL 实验  
**技术关键词**：`rapier` `threejs` `instanced-mesh` `kawase-blur` `color-grading` `cursor-collider`

## 快捷入口
- [Unseen Studio 官方技术文章（Codrops）](https://tympanus.net/codrops/2025/09/11/when-cells-collide-the-making-of-an-organic-particle-experiment-with-rapier-three-js/)
- [官方在线 Demo — Novacellix Cellular](https://unseen.co/labs/cellular/)
- [官方 Demo 参数/调色面板](https://unseen.co/labs/cellular/?gui=)
- [Unseen Studio](https://unseen.co/)

## 吸引我的重点
鼠标成为看不见的碰撞体；一群形似细胞的对象被推开并彼此接触，经过模糊、色彩映射、流体偏移后，看起来像一张活的有机薄膜。

## 技术拆解（公开文章的信息）
1. 设计阶段先用 Cinema 4D xParticles 做运动原型；
2. 网站使用 Astro / Vite / Three.js；
3. Rapier 负责 3D 刚体、球形 Collider、阻尼与碰撞；
4. Three.js 用 InstancedMesh 绘制，逐帧从 Rapier 同步位置；
5. Kawase Blur、基于亮度的颜色映射与流体扰动构成有机视觉。

## 能否拿来改用？
**未找到原项目完整、明确开源授权的下载仓库。** 文章展示了有限片段和方法，但 Codrops 的 MIT 默认条款面向其**可下载的 Demo**，不自动适用于 Unseen Studio 商业项目、网站打包代码、设计及素材。不要从已部署网页抓取/复制项目包后直接发布。建议用 Rapier（按该库许可）+ 自写 Three.js/GLSL 实现视觉原则。

## 我们的复刻路线
- Day A：200 个基本 `InstancedMesh` 细胞球 + Rapier 刚体碰撞。
- Day B：鼠标跟随的 Kinematic Collider，局部推动与阻尼。
- Day C：后处理模糊、色阶、流体扰动（可选）。
- 在独立 `exercises/` 下实现；不覆盖 NEBULA LAB V1。
