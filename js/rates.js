/**
 * js/rates.js — B2B 参考净价估算器(三个标签:机场接送 / 点对点 / 10 小时包车)
 * 数据来自 data/rates.js;界面文字来自 i18n。confirmed 里的价格显示“确认价格”,其余显示“参考估价”。
 */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var tab = 'airport';
  var el = { route: $('rate-route'), car: $('rate-car'), dir: $('rate-dir'), km: $('rate-km'), board: $('rate-board'), seat: $('rate-seat'),
             price: $('rate-price'), tag: $('rate-tag'), cap: $('rate-cap') };

  RATES.vehicles.forEach(function (v, i) { el.car.add(new Option(v.name + ' (' + v.pax + ')', i)); });

  /** 切换标签:显示/隐藏对应输入项,并重建路线下拉 */
  function setTab(t) {
    tab = t;
    document.querySelectorAll('#rate-tabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.t === t); });
    $('r-route').hidden = t === 'p2p'; $('r-dir').hidden = t !== 'airport'; $('r-km').hidden = t !== 'p2p'; $('r-board').hidden = t !== 'airport';
    el.route.innerHTML = '';
    (t === 'charter' ? RATES.charter : RATES.airport).forEach(function (r, i) { el.route.add(new Option(r.name, i)); });
    render();
  }

  /** 计算价格:确认价优先;否则 基础价×车型系数(取整到 500);再加附加项 */
  function render() {
    var v = RATES.vehicles[el.car.value], base, key, price, ok = false;
    if (tab === 'p2p') {
      price = (RATES.p2p.start + RATES.p2p.perKm * Math.max(1, +el.km.value || 1)) * v.mult;
    } else {
      var r = (tab === 'airport' ? RATES.airport : RATES.charter)[el.route.value];
      key = tab + ':' + r.id + ':' + v.id;
      if (RATES.confirmed[key] !== undefined) { price = RATES.confirmed[key]; ok = true; } else price = r.base * v.mult;
    }
    price = ok ? price : Math.round(price / 500) * 500;
    if (tab === 'airport' && el.board.checked) price += RATES.addons.board;
    price += Math.max(0, Math.min(4, +el.seat.value || 0)) * RATES.addons.seat;
    el.price.textContent = new Intl.NumberFormat(GL.lang, { style: 'currency', currency: 'JPY', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(price);
    el.tag.textContent = ok ? GL.t('rates.tag.ok') : GL.t('rates.tag.est');
    el.tag.className = ok ? 'ok' : 'est';
    el.cap.textContent = v.name + ' · ' + GL.t('fleet.pax').replace('{n}', v.pax);
  }

  document.querySelectorAll('#rate-tabs button').forEach(function (b) { b.onclick = function () { setTab(b.dataset.t); }; });
  [el.route, el.car, el.dir, el.km, el.board, el.seat].forEach(function (x) { x.onchange = x.oninput = render; });
  GL.onLang(render);
  setTab('airport');
})();
