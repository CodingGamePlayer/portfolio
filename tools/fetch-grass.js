// Regenerates the GitHub contribution ("잔디") data embedded in index.html.
// Usage: node tools/fetch-grass.js [username] [startYear] [endYear]
// No auth required — uses GitHub's public contributions fragment.
const https = require('https');

const user = process.argv[2] || 'CodingGamePlayer';
const y0 = +(process.argv[3] || 2023);
const y1 = +(process.argv[4] || new Date().getFullYear());
const today = new Date().toISOString().slice(0, 10);

const get = (url) => new Promise((res, rej) => {
  https.get(url, { headers: { 'User-Agent': 'grass-fetch' } }, r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => res(d));
  }).on('error', rej);
});

(async () => {
  const years = [];
  let total = 0, activeTotal = 0, inactiveTotal = 0;
  for (let y = y0; y <= y1; y++) {
    const html = await get(`https://github.com/users/${user}/contributions?from=${y}-01-01&to=${y}-12-31`);
    // cell -> level
    const lv = {};
    for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g)) lv[m[1]] = +m[2];
    for (const m of html.matchAll(/data-level="(\d)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g)) lv[m[2]] = +m[1];
    // tooltip -> exact count
    const cnt = {};
    for (const m of html.matchAll(/<tool-tip[^>]*>(\d+) contributions? on ([^<.]+)\./g)) cnt[m[2].trim()] = +m[1];
    const sum = Object.values(cnt).reduce((a, b) => a + b, 0);

    const dates = Object.keys(lv).filter(d => d.startsWith(y + '-') && d <= today).sort();
    const levels = dates.map(d => lv[d]).join('');
    const active = dates.filter(d => lv[d] > 0).length;
    const inactive = dates.length - active;
    total += sum; activeTotal += active; inactiveTotal += inactive;
    years.push({ year: y, start: new Date(dates[0] + 'T00:00:00Z').getUTCDay(), levels, contributions: sum, active, inactive, days: dates.length });
    console.error(`${y}: ${sum} contributions / ${active} active / ${inactive} inactive (${dates.length} days)`);
  }
  console.error(`TOTAL ${y0}-${y1}: ${total} contributions, ${activeTotal} active, ${inactiveTotal} inactive`);
  process.stdout.write(JSON.stringify({ user, total, activeTotal, inactiveTotal, years }));
})();
