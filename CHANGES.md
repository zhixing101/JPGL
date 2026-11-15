# 本次更新内容(合并到 GitHub 仓库 zhixing101/JPGL 时参考)

## 新增文件
- assets/images/qr-whatsapp.png  — WhatsApp Business(Hikari)二维码
- assets/images/qr-instagram.png — Instagram @JAPANPRIVATETRANSPORT 二维码
- CHANGES.md                      — 本说明

## 修改文件(覆盖前请先用 git diff 看一下你在仓库里是否改过这些文件)
- index.html            价格区改为三标签工具;联系区加入邮箱、Instagram、WhatsApp 和两个二维码
- js/rates.js           重写:机场接送 / 点对点 / 10 小时包车,车型、附加项、确认价与估价标注
- js/main.js            申请表改为“打开邮件应用发给 Tokyo9266@gmail.com”;邮箱/Instagram 做成链接
- data/site.js          邮箱、Instagram、WhatsApp 信息
- data/rates.js         新的价格数据结构(含 confirmed 确认价)
- css/components.css    标签、附加项、联系卡片与二维码样式
- css/responsive.css    手机上二维码缩小
- i18n/*.js(15 个)      英/简/繁/日:新增价格工具与联系的 14 条文案,更新 rates.title、rates.note、form.ok;
                         其余 11 种语言:删除过时的 form.ok(回退到英文),新增文案暂为英文
- README.md             更新说明

## 提交到 GitHub(在仓库根目录,把本包内容复制进去之后)
    git add -A
    git commit -m "Add B2B rate tool, contact email, WhatsApp/Instagram QR codes"
    git push
