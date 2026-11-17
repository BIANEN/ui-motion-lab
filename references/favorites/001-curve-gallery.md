# FAV-001 · Curve Gallery

**类型**：公开教程 Demo / 3D 摄影机路径 / WebGL 画廊  
**用途**：Museum of Fields 的三维展览漫游、滚动相机练习  
**标签**：`threejs` `gsap` `blender` `scroll` `camera-path` `gallery`

## 入口
- [体验原始 Demo](https://tympanus.net/Tutorials/CurveGallery/)
- [官方 GitHub 代码](https://github.com/gaspoorf/curve-gallery)
- [已保存的本仓库独立参考分支](https://github.com/BIANEN/ui-motion-lab/tree/reference/curve-gallery-archive/references/curve-gallery)
- [Codrops 许可说明](https://tympanus.net/codrops/licensing/)

## 技术可拆解
1. Blender 曲线导出为 5 组 JSON 路径点；
2. `THREE.CatmullRomCurve3` 重建路线；
3. GSAP Observer 把滚轮/触摸变化映射到相机参数 `t`；
4. 使用相机与图片的位置距离来控制聚焦放大；
5. 切换路径时，图片与相机平滑转场。

## 能否拿来改用？
**原作者源码公开，适合下载学习与试改**。Codrops 表示其可下载 Demo 默认 MIT，但当前原作者 GitHub 未附独立 LICENSE（且最新提交删除了 License 描述）；修改后的对外发布或商业使用，请核对对应下载版本的授权和版权声明。**图片、字体等素材需单独核实，不随代码自动获得商用许可。**

## 我们的练习
- 基础版：先用自有 3D 几何体代替图片，完成一条曲线路径。
- 进阶版：导入 Blender 导出的自定义路线，完成 3 个独立展览入口。
- 不覆盖 `experiments/human-mesh/` 或主站。
