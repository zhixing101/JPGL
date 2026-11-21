# 本次更新(2026-11-21):车队展示 + 高端视觉层

## 新增文件
- css/premium.css          高端视觉层:深海军蓝 + 香槟金 + 衬线标题、全幅 Hero、玻璃卡片、车队展示样式(不想要时删掉 index.html 里这一行引用即可恢复原样)
- js/fleet.js              车队标签切换、缩略图换主图、"查看该车型参考价"自动选中报价工具车型
- assets/images/fleet/*.jpg  从客户提供的 Alphard / HiAce 两张车型图裁剪出的 12 张图(外观、内饰、后排、行李箱、侧视)

## 修改文件
- index.html     导航加 "Partner enquiry" 按钮;Hero 改为全幅照片 + 主力车型卡片;车队区重做(Alphard 7 座 / HiAce 10 座 展示 + Coaster / Bus Grande);引入 premium.css、fleet.js
- css/responsive.css  追加高端版的平板/手机适配
- i18n/en.js、zh-CN.js、zh-TW.js、ja.js  新增 ~24 条车队文案(其余 11 种语言自动回退英文)

## 图片来源与规格(来自客户图)
- Alphard:7 座;满载 5 位乘客 + 5 件 24 寸行李箱;图示 Alphard 第三代 / Vellfire 第三代;
  注:指定第三代或第四代 Alphard 需联系客服报价(原图脚注,已保留)。
- HiAce:10 座;满载 9 位乘客 + 9 件 24 寸行李箱。
- 图片分辨率偏低(原图为截图),建议换成高清原图后保持同名覆盖 assets/images/fleet/。

## 提交
    git add -A
    git commit -m "Premium visual layer; Alphard/HiAce fleet showcase"
    git push

---
# 追加更新(同日):配色 / Logo / 图片放大

- **导航栏改浅色**(白底 + 金色细线),Logo 与语言选择在页面顶部、Hero 之上始终可见;Hero 遮罩调亮,富士山照片更通透。
- **新 Logo**(assets/logo/):emblem.svg(徽标)、logo-light.svg / logo-dark.svg(横版,浅底 / 深底)及 PNG;
  徽标 = 富士山 + 日轮 + 通向山脚的公路 + 顶部两个相扣的链环(Link / 合作),横版带金色 "B2B" 标牌与 "GROUND TRANSPORT",一眼看出是 B2B 地面交通。网站图标(favicon)同用徽标。
- **车辆图片增强**:assets/images/fleet/hi/ ——4 倍放大 + 去噪 + 锐化 + 局部对比增强(程序处理,不是 AI 重建)。
- **放大查看**:车队主图鼠标悬停有 2.6 倍放大镜;点击进入全屏查看,滚轮 / ＋－按钮 / 双指缩放(最大 8 倍),拖动平移,双击放大,←→ 切换图片,Esc 关闭。
- 新增翻译键 fleet.zoom(en / 简 / 繁 / 日)。

---
# 再次调整
- 车辆图片不再加工,直接使用从客户图裁切的原图(已删除 assets/images/fleet/hi/);放大镜和全屏查看保留。
- 只保留已完整翻译的 4 种语言(English / 简体中文 / 繁體中文 / 日本語);删除其余 11 个不完整的语言文件、语言下拉项、脚本引用。
- 首屏"主力车型"卡片改为明亮的白底卡片,用两张白色车身侧视图(Alphard / HiAce),更清晰。
