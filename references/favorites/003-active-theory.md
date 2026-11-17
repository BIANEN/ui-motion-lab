# FAV-003 · Active Theory

**类型**：高端沉浸式品牌网站 / WebGL / 实时数字艺术 / 空间叙事  
**技术关键词**：`hydra` `webgl` `gpgpu` `3d-gallery` `scroll-navigation` `cinematic-motion`

## 快捷入口
- [Active Theory 官方网站](https://activetheory.net/)
- [官方技术文章：The Story of Technology Built at Active Theory](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4)

## 吸引我的重点
将作品介绍、导航、摄影机、光线和三维场景融合成持续的浏览体验。与传统“文字 + 图片 + 卡片”的网页结构不同，用户像进入一个可探索的空间。

## 技术方向
- Hydra 为工作室自行开发的 3D / 交互引擎；
- 大量实时渲染、Shader、GPU 计算、场景转场；
- 光影、声音、摄影机路径和滚动映射共同组织叙事。
- 本条是**设计和架构参考**，并非对现有网页源码的授权性复制。

## 能否拿来改用？
**不可假设能直接下载并商用 Active Theory 原站源码。** 未确认官方公开其完整网站工程的可复用许可。网页能看到资源、GitHub 上存在第三方逆向研究，均不代表原作者授权重用其商业网站、字体、视频、3D 模型、品牌资产或 Hydra 完整引擎。

## 我们的独立复刻路线
1. 用 React Three Fiber + Three.js 创建自己的空间、材质与光；
2. GSAP ScrollTrigger / Timeline 制作场景切换和镜头运动；
3. 用 Blender 制作自有雕塑与建筑；
4. 如需粒子/GPGPU/流体效果，使用符合许可的独立组件，不调用原站私有资源；
5. 用原创视觉设计，而不是复制该公司的品牌视觉成品。

**应用场景**：Museum of Fields、未来 3D 艺术馆、电影感 Hero、交互式作品导航。
