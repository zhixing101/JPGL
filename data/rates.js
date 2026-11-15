/**
 * data/rates.js — B2B 参考净价(仿 BM Destination 的“B2B 参考净价”工具结构:机场接送 / 点对点 / 10 小时包车)
 *
 * ⚠ 价格来源说明:
 *   - confirmed 里的价格是从参考网站页面上读到的真实数字(目前只有 1 条);
 *   - 其余价格是演示用的估算(base × 车型系数),界面会标注“参考估价”。请用真实报价逐条替换,
 *     替换后把对应 key 加进 confirmed 即可,界面会自动改为“确认价格”。
 * 价格 = 路线基础价(以 Alphard 计) × 车型系数,四舍五入到 500 日元;再加附加项。
 * 含税、含高速费、含停车费;兜牌接机 +¥5,000;儿童座椅每张 +¥5,000。
 */
window.RATES = {
  addons: { board: 5000, seat: 5000 },
  vehicles: [   // mult = 车型系数;pax = 载客数(来自上传图片)
    { id: 'alphard', name: 'Toyota Alphard',    pax: 5,  mult: 1.0 },
    { id: 'hiace',   name: 'Toyota HiAce',      pax: 9,  mult: 1.2 },
    { id: 'coaster', name: 'Toyota Coaster',    pax: 20, mult: 1.9 },
    { id: 'bus',     name: 'Bus Grande',        pax: 49, mult: 2.6 }
  ],
  airport: [    // 10 条机场路线(与参考网站一致);base = Alphard 估算价(KIX-OSA 为确认价)
    { id: 'KIX-OSA', name: 'Kansai Airport (KIX) → Osaka city',   base: 25000 },
    { id: 'KIX-KYO', name: 'Kansai Airport (KIX) → Kyoto city',   base: 32000 },
    { id: 'KIX-KOB', name: 'Kansai Airport (KIX) → Kobe city',    base: 28000 },
    { id: 'ITM-OSA', name: 'Itami Airport (ITM) → Osaka city',    base: 20000 },
    { id: 'ITM-KYO', name: 'Itami Airport (ITM) → Kyoto city',    base: 25000 },
    { id: 'ITM-KOB', name: 'Itami Airport (ITM) → Kobe city',     base: 23000 },
    { id: 'HND-TYO', name: 'Haneda Airport (HND) → Tokyo 23 wards', base: 20000 },
    { id: 'NRT-TYO', name: 'Narita Airport (NRT) → Tokyo 23 wards', base: 32000 },
    { id: 'HND-YOK', name: 'Haneda Airport (HND) → Yokohama city',  base: 20000 },
    { id: 'NRT-YOK', name: 'Narita Airport (NRT) → Yokohama city',  base: 38000 }
  ],
  charter: [    // 10 小时包车:按城市(演示估算)
    { id: 'OSA', name: 'Osaka · 10-hour charter',   base: 65000 },
    { id: 'KYO', name: 'Kyoto · 10-hour charter',   base: 70000 },
    { id: 'KOB', name: 'Kobe · 10-hour charter',    base: 65000 },
    { id: 'TYO', name: 'Tokyo · 10-hour charter',   base: 75000 },
    { id: 'YOK', name: 'Yokohama · 10-hour charter', base: 72000 }
  ],
  p2p: { start: 12000, perKm: 350 },          // 点对点(演示估算):起步价 + 每公里
  confirmed: { 'airport:KIX-OSA:alphard': 25000 }   // 真实确认价(key = 服务:路线:车型)
};
