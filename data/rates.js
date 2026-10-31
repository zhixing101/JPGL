/**
 * data/rates.js — B2B 参考净价(演示数值,不是真实报价!)
 * 价格 = 路线基础价 × 车型系数,四舍五入到 500 日元。
 */
window.RATES = {
  routes: [   // 路线名按机场/地名原样显示(不翻译)
    { name: 'KIX → Osaka',            base: 20000 },
    { name: 'KIX → Kyoto',            base: 26000 },
    { name: 'KIX → Kobe',             base: 24000 },
    { name: 'HND → Tokyo 23 wards',   base: 18000 },
    { name: 'NRT → Tokyo 23 wards',   base: 28000 },
    { name: 'NRT → Yokohama',         base: 30000 }
  ],
  vehicles: [ // mult = 车型系数
    { name: 'Alphard (5)',     mult: 1.0 },
    { name: 'HiAce (9)',       mult: 1.1 },
    { name: 'Coaster (20)',    mult: 1.9 },
    { name: 'Bus Grande (49)', mult: 2.6 }
  ]
};
