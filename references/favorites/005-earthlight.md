# FAV-005 · Earthlight

![Earthlight 官方封面：夜侧地球边缘、极光和银河](https://raw.githubusercontent.com/maxvyshniakov/earthlight/b6fd3c12b6be0bb03fd557a3258fb4f002e747b0/docs/media/aurora.webp)

> **图片来源**：Max Vyshniakov 官方仓库 [docs/media/aurora.webp](https://github.com/maxvyshniakov/earthlight/blob/b6fd3c12b6be0bb03fd557a3258fb4f002e747b0/docs/media/aurora.webp)。这是**原作者的作品截图，不是你所分享的具体视角截图**。采用外链显示，未将图片复制进 UI Motion Lab。

**作者**：Max Vyshniakov  
**类型**：实时地球/太空 WebGL 模拟 · 摄影镜头 · 大气光学 · 科学数据视觉化  
**关键词**：`raw-webgl` `glsl` `atmosphere` `aurora` `space` `orbit` `camera` `earth`

## 收藏入口

- **[你保存的原始视角（时间/位置/镜头参数完整保留）](https://earthlight.maxvyshniakov.com/?t=1770.92&lens=0.5&epoch=2026-11-17T13%3A47%3A09.749Z&flight=free&position=0.92773528%2C-0.44039582%2C-0.29197542&orientation=-0.5376211782%2C-0.4924745487%2C0.6104921749%2C-0.3094052230)**
- [Earthlight 默认页面](https://earthlight.maxvyshniakov.com/)
- **[原作者 GitHub 完整源码](https://github.com/maxvyshniakov/earthlight)**
- [制作介绍](https://maxvyshniakov.com/work/earthlight/)
- [MIT 许可证](https://github.com/maxvyshniakov/earthlight/blob/main/LICENSE)
- [第三方素材清单 NOTICE.md](https://github.com/maxvyshniakov/earthlight/blob/main/NOTICE.md)

## 这个镜头的存档参数

| 参数 | 值 |
|---|---|
| time `t` | `1770.92` |
| focal lens | `0.5` |
| epoch | `2026-11-17T13:47:09.749Z` |
| flight | `free` |
| position | `0.92773528,-0.44039582,-0.29197542` |
| orientation | `-0.5376211782,-0.4924745487,0.6104921749,-0.3094052230` |

链接提供恢复视角所需参数，但进入后模拟是否继续计时取决于 Earthlight 自身配置。

## 为什么收藏 / 核心交互

- 可从 ISS 轨道、极地/高轨和自由飞行状态观察地球、月球及天球
- 自由控制相机、镜头倍率、曝光、日期和时间，直接分享含状态参数的 URL
- 实时绘制云、大气散射、地球夜景、极光、星空与镜头光学效果
- 不是预录动画：作者 README 说明是单一 **raw WebGL renderer，不使用 Three.js**

## 技术拆解与我们的使用方向

1. **光学渲染**：GLSL、大气 Rayleigh scattering、消光、折射与天光，未来可用于 NEBULA LAB 的光学空间
2. **相机和空间状态**：轨道飞行、自由视角、URL 保存参数；可参考设计 P1 沉浸式艺术馆入口
3. **真实数据与虚拟美术**：NASA/ESA 卫星纹理、星表、月面和地形信息；必须说明哪些不是实时天气
4. **可用性与性能**：按距离加载高精细纹理与资源、实时渲染性能优化

## 能直接拿来改用吗？

**代码可以按 MIT 修改、再分发、商用。** 原仓库顶层 `LICENSE` 是 MIT，© 2026 Max Vyshniakov，需要保留许可证和版权声明。

**数据、截图及素材不随代码自动 MIT。** `NOTICE.md` 单独列出 HYG 星表（CC BY-SA 4.0）、ESA WorldCover（CC BY 4.0）、NASA 图像、Copernicus 地形、Inter 字体等各自的许可/署名条件。商用需逐项确认和替换必要素材。

## 下一步练习

- **20–30 分钟初级版**：用 R3F/Three.js 建一个地球球体 + 自制蓝色 Fresnel 大气光晕 + 轨道视角。
- **第二阶段**：单独研究作者的 WebGL/GLSL 大气散射实现，移植自己需要的算法并保留开源许可。
- **第三阶段**：时间、光照、相机姿态参数可序列化成 URL。
- **项目约束**：在独立练习目录实现；不覆盖 Museum of Fields 主站或 `experiments/human-mesh/`。

此收藏只保存链接、归档视角、技术研究笔记和外部预览图。**未将原项目完整代码复制到本仓库。**
