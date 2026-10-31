/**
 * js/main.js — 页面初始化(语言选择、公司资料、演示表单)
 */
(function () {
  // 1. 语言下拉
  var sel = document.getElementById('lang-select');
  GL.LANGS.forEach(function (l) { sel.add(new Option(l[1], l[0])); });
  sel.onchange = function () { GL.apply(sel.value); GL.remember(sel.value); };

  // 2. 填入公司资料(data/site.js)
  document.querySelectorAll('[data-site]').forEach(function (el) { el.textContent = SITE[el.dataset.site] || ''; });

  // 3. 演示表单:只显示感谢语,不发送任何数据
  document.getElementById('f-send').onclick = function () {
    document.getElementById('form-status').textContent = GL.t('form.ok');
  };

  // 4. 首次应用语言
  var first = GL.detect();
  sel.value = first;
  GL.apply(first);
})();
