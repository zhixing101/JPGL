/**
 * js/i18n.js — 多语言引擎
 *  - 翻译字典来自 i18n/*.js(window.I18N['语言代码'] = {键: 文本})
 *  - 查找顺序:当前语言 → 英文 → 键名本身(缺失时可一眼看出)
 *  - 对外接口:window.GL
 */
(function () {
  // 支持的语言:[代码, 显示名称]。新增语言:在此加一行 + 新建 i18n/xx.js + index.html 引入。
  var LANGS = [
    ['zh-CN','简体中文'],['zh-TW','繁體中文'],['en','English'],['ja','日本語']
  ];   // 只保留已完整翻译的语言
  var RTL = ['he', 'ar'];            // 从右到左的语言
  var STORE = 'gl-lang';             // localStorage 键:记住用户选择
  var listeners = [];                // 语言切换后要执行的回调(如重绘价格)
  var current = 'en';

  /** 取翻译文本(含回退) */
  function t(key, lang) {
    var d = window.I18N || {};
    var l = d[lang || current];
    if (l && l[key] !== undefined) return l[key];
    if (d.en && d.en[key] !== undefined) return d.en[key];
    return key;
  }

  /** 自动检测语言:?lang= 参数 → 上次选择 → 浏览器语言 → 英文 */
  function detect() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && window.I18N[q]) return q;
    try { var s = localStorage.getItem(STORE); if (s && window.I18N[s]) return s; } catch (e) {}
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var x = String(list[i]).toLowerCase();
      if (x.indexOf('zh') === 0) return /tw|hk|mo|hant/.test(x) ? 'zh-TW' : 'zh-CN';  // 繁/简区分
      if (x.indexOf('iw') === 0) return 'he';                                         // 旧版希伯来语代码
      var base = x.split('-')[0];
      if (window.I18N[base]) return base;
    }
    return 'en';
  }

  /** 应用语言到整个页面 */
  function apply(lang) {
    current = lang;
    var root = document.documentElement;
    root.lang = lang;
    root.dir = RTL.indexOf(lang) >= 0 ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var txt = t(el.dataset.i18n);
      if (el.dataset.pax) txt = txt.replace('{n}', el.dataset.pax);          // 载客数
      if (el.dataset.i18nPart !== undefined) txt = txt.split('|')[+el.dataset.i18nPart] || '';  // 标题|说明
      el.textContent = txt;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    document.title = 'Japan GroundLink · ' + t('hero.title');
    listeners.forEach(function (fn) { fn(lang); });
  }

  window.GL = {
    LANGS: LANGS, t: t, detect: detect, apply: apply,
    get lang() { return current; },
    onLang: function (fn) { listeners.push(fn); },
    remember: function (l) { try { localStorage.setItem(STORE, l); } catch (e) {} }
  };
})();
