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
│  ├─ rates.js           B2B 参考净价工具(三个标签)
│  └─ main.js            初始化、语言下拉、演示表单
├─ data/
│  ├─ site.js            公司资料(邮箱、Instagram、WhatsApp;地址/许可证号占位)
│  └─ rates.js           B2B 参考净价数据(1 条确认价 + 演示估算)
├─ i18n/                 每种语言一个文件(15 个)
├─ assets/images/        hero / 图标 / 车型 / 目的地,以及 qr-whatsapp.png、qr-instagram.png
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
- `data/site.js`:邮箱 Tokyo9266@gmail.com、Instagram @JAPANPRIVATETRANSPORT、WhatsApp Business(Hikari)二维码已填入;**地址和许可证号仍是占位符**,请换成真实信息。
- `data/rates.js`:B2B 参考净价工具(机场接送 10 条路线 / 点对点 / 10 小时包车,4 种车型,附加项:举牌 +¥5,000、儿童座椅每张 +¥5,000)。
  **只有 1 条价格是确认价**(KIX → 大阪市内 · Alphard ¥25,000,读自参考网站页面);其余是演示估算,界面显示“参考估价”。用真实报价替换后,把 key 加进 `confirmed`,界面会自动改为“确认价格”。
- 申请表:点“提交”会打开邮件应用,收件人是 Tokyo9266@gmail.com,内容已填好(需先勾选确认);不会自动发送,也没有后台。
- 图片从一张 1254 像素的图拆出,目的地照片分辨率较低,正式使用请换高清原图。
