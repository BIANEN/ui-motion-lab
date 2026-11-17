# Curve Gallery — 原作者源码参考归档

原始在线 Demo：https://tympanus.net/Tutorials/CurveGallery/
原作者源码：https://github.com/gaspoorf/curve-gallery
Codrops 文章：https://tympanus.net/codrops/?p=117076
上游固定 commit：`51ac2f562b0af38624da939c7b4e39ba4e6e5b08`
源码作者：Gaspard Hedde（gaspoorf）

## 保存范围

本目录 `source/` 保留了官方 GitHub 仓库的 JavaScript、CSS、HTML、依赖清单/锁文件、README 和五条 Blender 相机路径 JSON，原始文本保持不变。

**不包含原项目的 19 张 WebP 图片**。为避免未经单独确认权利即在公开仓库复制图片，提供 `scripts/download-assets.mjs`，仅用于在本地按需下载上游固定 commit 的演示图片；请不要把下载的第三方素材直接重新发布或商用。

## 运行方法（Node.js 22+）

```bash
cd references/curve-gallery/source
npm ci
node ../scripts/download-assets.mjs
npm run dev
```

## 核心学习点

- `source/public/paths/path1.json`–`path5.json`：Blender 导出曲线路径
- `buildCurve()` / `THREE.CatmullRomCurve3`：路径重建
- `getCurveFrame()`：根据切线计算法向并布置图片
- `Observer.create()`：鼠标滚轮/触控输入
- `gsap.quickTo()`：动画缓入
- `computeFocusScale()`：近距离聚焦放大
- `redistributePlanes()`：五条路径之间的平滑过渡

## 许可与署名

Codrops 官网说明其可下载 Demo 默认采用 MIT 许可（若无特别说明）：https://tympanus.net/codrops/licensing/ 。保留 [LICENSE-CODROPS.txt](LICENSE-CODROPS.txt) 与原作者链接。第三方图像和字体等资产可能另有授权限制。

本归档是独立学习参考，未与 UI Motion Lab 主页面或 NEBULA LAB 原有实现集成。
