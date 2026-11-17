# FAV-004 · Magical Reflections

![Magical Reflections 白色拱廊数字艺术馆入口](https://images.prismic.io/makemepulse/d614e615-f502-4429-bd2b-ea3891ed041a_museum.png?auto=compress%2Cformat)

> 图片来源：Makemepulse 官方文章中的 Magical Reflections 展厅图片；本仓库仅引用外部链接，未重新上传第三方图片。图片及网站元素不自动获得商用授权。

**作者 / 项目**：Makemepulse × Meta，为柏林 Alte Nationalgalerie 的 Johann Erdmann Hummel 展览制作的 WebXR 体验  
**类型**：3D 艺术馆 / 绘画内漫游 / 虚拟摄影 / 多设备 WebXR  
**关键词**：`nanogl` `webxr` `vue` `xstate` `blender` `houdini` `pbr` `lightmap` `immersive-museum`

## 快捷入口
- [Makemepulse 技术解析](https://www.makemepulse.com/news/magical-reflections-a-webxr-experience-powered-by-nanogl)
- [官方案例展示（含更多项目图片）](https://www.makemepulse.com/case-study/alte-nationalgalerie-magical-reflections)
- [Nanogl 开源引擎入口（不是完整艺术馆源码）](https://github.com/plepers/nanogl)

## 为什么收藏
这个案例把一幅平面历史绘画变成一个可自由移动、拍照的沉浸式三维世界；虚拟展厅先形成过渡空间，再引导观众进入作品内部，和我们规划中的 **Museum of Fields /《摧毁只是一瞬间》** 多空间叙事非常契合。

## 技术拆解（作者公开内容）
1. **美术与空间**：艺术家重建绘画内物体和不可见的环境，使用 Blender、Houdini 制作 3D 场景与烘焙 lightmap。
2. **实时渲染**：自研 WebGL 微框架 NanoGL，PBR 材质、镜头耀斑、色差、地面实时反射、混合反射 Shader。
3. **交互与状态**：Vue.js + XState；桌面、手机与 WebXR 使用适配的交互界面。
4. **性能**：按帧率降低特效等级；对远景人物使用 impostor 和材质合并；VR 设备关注持续帧率。
5. **体验叙事**：从展馆进入绘画场景、探索历史细节、拍照分享。

## 能否直接拿来改？
**不能把完整作品当成开源模板直接复制或商用。** Makemepulse 的文章公开了技术方案及少量 Shader 片段，NanoGL 微框架有独立源码，但不等于其专有艺术馆工程、3D 模型、画作重建素材、照片、音乐、品牌和 UI 获得开放授权。已核实 NanoGL 官方仓库为 GPL-2.0 许可证，若将该框架整合到新项目，必须遵循 GPL 的再分发及源码提供等要求；发布新项目还应使用自己的美术资产。

## 适合 UI Motion Lab 的练习
- **15–30 分钟**：创建一个简化的浅色美术馆入口（3 个拱门、地面、灯光），点击画框时用 GSAP 摄影机缓入。
- **下一阶段**：一个场景里有多个画作入口，进入后仍能以 3D 环视作品、回退展厅。
- **进阶**：Blender 建模 + 自有 lightmap + R3F + XR 支持；每步单独作为实验，不修改已有主站。

> 存档说明：这里只存研究笔记和图片链接，不包含完整来源网站的源代码或素材。
