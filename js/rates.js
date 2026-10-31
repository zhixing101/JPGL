/**
 * js/rates.js — B2B 参考净价估算器(数据来自 data/rates.js)
 */
(function () {
  var routeSel = document.getElementById('rate-route');
  var carSel   = document.getElementById('rate-car');
  var out      = document.getElementById('rate-price');

  // 初始化下拉选项
  RATES.routes.forEach(function (r, i)   { routeSel.add(new Option(r.name, i)); });
  RATES.vehicles.forEach(function (v, i) { carSel.add(new Option(v.name, i)); });

  /** 计算并显示价格(货币格式随语言变化) */
  function render() {
    var r = RATES.routes[routeSel.value], v = RATES.vehicles[carSel.value];
    var price = Math.round(r.base * v.mult / 500) * 500;
    out.textContent = new Intl.NumberFormat(GL.lang, { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(price);
  }
  routeSel.onchange = carSel.onchange = render;
  GL.onLang(render);   // 语言切换时刷新格式
})();
