/**
 * js/main.js — 页面初始化(语言选择、公司资料、申请表发邮件)
 */
(function () {
  // 1. 语言下拉
  var sel = document.getElementById('lang-select');
  GL.LANGS.forEach(function (l) { sel.add(new Option(l[1], l[0])); });
  sel.onchange = function () { GL.apply(sel.value); GL.remember(sel.value); };

  // 2. 填入公司资料(data/site.js)
  document.querySelectorAll('[data-site]').forEach(function (el) {
    el.textContent = SITE[el.dataset.site] || '';
    var u = SITE[el.dataset.site + 'Url']; if (u && el.tagName === 'A') el.href = u;     // 邮箱、Instagram 做成链接
  });

  // 3. 申请表:点“提交”会打开邮件应用,收件人是 SITE.email(Tokyo9266@gmail.com),内容已填好
  window.buildMailto = function () {
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var body = ['Company: ' + v('f-company'), 'Country/market: ' + v('f-country'), 'Contact: ' + v('f-contact'), 'Email/WhatsApp: ' + v('f-email'), 'Expected volume: ' + v('f-volume')].join('\n');
    return 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('B2B partnership application - ' + (v('f-company') || 'Japan GroundLink')) + '&body=' + encodeURIComponent(body);
  };
  document.getElementById('f-send').onclick = function () {
    var st = document.getElementById('form-status');
    if (!document.getElementById('f-consent').checked) { st.textContent = GL.t('apply.consent'); return; }   // 先勾选确认
    st.textContent = GL.t('form.ok');
    location.href = window.buildMailto();
  };

  // 4. 首次应用语言
  var first = GL.detect();
  sel.value = first;
  GL.apply(first);
})();
