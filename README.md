# Japan GroundLink — B2B 地面交通 Demo

纯静态网站(HTML + CSS + JS),**无需安装、无需构建**。

## 本地运行
- 方式一:双击 `index.html`(文件方式即可)。
- 方式二(推荐,更接近线上环境):在本目录执行 `python -m http.server 8000`,浏览器打开 http://localhost:8000
- 强制某语言:`index.html?lang=ar`(可选 zh-CN zh-TW en ja ko vi es pt fr de it ru el he ar)

## 目录结构
```
japan-groundlink/
├─ index.html            页面结构(13 个区块,按编号注释)
├─ css/
│  ├─ base.css           颜色变量、重置、排版、深色模式
│  ├─ components.css     各区块样式
│  └─ responsive.css     平板/手机适配
├─ js/
│  ├─ i18n.js            多语言引擎(自动检测、回退英文、RTL)
│  ├─ rates.js           B2B 参考净价估算器
│  └─ main.js            初始化、语言下拉、演示表单
├─ data/
│  ├─ site.js            公司资料(占位符,请替换)
│  └─ rates.js           演示价格表(非真实报价)
├─ i18n/                 每种语言一个文件(15 个)
├─ assets/images/        从上传图片拆出的 hero / 图标 / 车型 / 目的地
└─ tools/i18n-check.html 翻译完整度与逐条对照工具
```

## 检查 / 修改翻译
1. 打开 `tools/i18n-check.html`:看各语言完成度,选择语言与英文逐条对照(红色 = 缺失)。
2. 编辑 `i18n/<语言>.js` 里对应的键;含 `|` 的条目是“标题|说明”两段。
3. 保存后刷新 `index.html` 即可。缺失的键自动显示英文。

**当前状态**:英文、简体、繁体、日语为完整;其他 11 种语言只有首批 19 条(导航、服务、车型、目的地、口号),
B2B 新增内容(优势、价格、流程、申请表等 38 条)尚未翻译,会显示英文。所有译文均为 AI 撰写,请母语者审校。

## 新增语言
在 `js/i18n.js` 的 `LANGS` 加一行 → 复制 `i18n/en.js` 为新文件并翻译 → 在 `index.html` 和 `tools/i18n-check.html` 引入。

## 部署
把整个文件夹上传到 GitHub Pages / Netlify 即可(index.html 放根目录)。

## 注意
- `data/site.js` 的许可证号、地址、邮箱、电话均为占位符,请换成真实信息。
- `data/rates.js` 是演示数值,不是真实价格。
- 表单只做前端演示,不会发送数据;正式使用需接入邮件/CRM。
- 图片从一张 1254 像素的图拆出,目的地照片分辨率较低,正式使用请换高清原图。
