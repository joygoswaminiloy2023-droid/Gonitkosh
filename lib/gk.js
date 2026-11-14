// JavaScript port of gonitkosh.hpp — same functions, same error messages.
const E = (kind, m) => Object.assign(new Error(m), { kind });
const nan = (v, l) => { if (Number.isNaN(v)) throw E('invalid_argument', `${l} must be a valid number (got NaN)`); };
const MAX = 9223372036854775807n, MIN = -MAX - 1n;
const big = (v) => { if (!Number.isFinite(v)) throw E('overflow_error', 'Value does not fit in long long'); const b = BigInt(Math.trunc(v)); if (b > MAX || b < MIN) throw E('overflow_error', 'Value does not fit in long long'); return b; };
const ab = (b) => (b < 0n ? -b : b);
const lst = (v, fn) => { if (!v.length) throw E('domain_error', `${fn}() requires at least one number`); v.forEach((x) => nan(x, 'list element')); };
const toLL = (v) => { if (!Number.isFinite(v) || v >= 9.2233720368547758e18 || v < -9.2233720368547758e18) throw E('overflow_error', 'Result does not fit in long long'); return BigInt(v); };
const two = (f) => (a, b) => { nan(a, 'a'); nan(b, 'b'); return f(a, b); };

const IMPL = {
  jog: two((a, b) => a + b), biyog: two((a, b) => a - b), gun: two((a, b) => a * b),
  bhag: two((a, b) => { if (b === 0) throw E('domain_error', 'Division by zero is not allowed'); return a / b; }),
  bhagshesh: two((a, b) => { if (b === 0) throw E('domain_error', 'Modulus by zero is not allowed'); return a % b; }),
  ghat: (x, y) => {
    nan(x, 'base'); nan(y, 'exponent');
    if (x === 0 && y < 0) throw E('domain_error', 'Zero cannot be raised to a negative power');
    const r = Math.pow(x, y);
    if (Number.isNaN(r)) throw E('domain_error', 'Result is not a real number (negative base, fractional exponent)');
    return r;
  },
  borgomul: (n) => { nan(n, 'n'); if (n < 0) throw E('domain_error', 'Square root of a negative number is not real'); return Math.sqrt(n); },
  ghonokfol: (n) => { nan(n, 'n'); return n * n * n; },
  borgo: (n) => { nan(n, 'n'); return n * n; },
  gorh: (v) => { lst(v, 'gorh'); return v.reduce((s, x) => s + x, 0) / v.length; },
  sarbadhik: (v) => { lst(v, 'sarbadhik'); return Math.max(...v); },
  sarbonimno: (v) => { lst(v, 'sarbonimno'); return Math.min(...v); },
  guniyo: (n) => {
    if (n < 0n) throw E('domain_error', 'Factorial requires a non-negative integer');
    if (n > 20n) throw E('overflow_error', 'Factorial above 20 overflows unsigned long long');
    let r = 1n; for (let i = 2n; i <= n; i++) r *= i; return r;
  },
  jorno: (n) => n % 2n === 0n, bijorno: (n) => n % 2n !== 0n,
  moulik: (n) => {
    if (n < 2n) return false; if (n < 4n) return true;
    if (n > 10n ** 12n) throw E('runtime_error', 'Too large for the browser demo (max 10^12)');
    const m = Number(n); if (m % 2 === 0 || m % 3 === 0) return false;
    for (let i = 5; i <= m / i; i += 6) if (m % i === 0 || m % (i + 2) === 0) return false;
    return true;
  },
  gosagu: (a, b) => { let x = ab(a), y = ab(b); while (y !== 0n) [x, y] = [y, x % y]; if (x > MAX) throw E('overflow_error', 'GCD does not fit in long long'); return x; },
  losagu: (a, b) => {
    if (a === 0n || b === 0n) return 0n;
    const g = IMPL.gosagu(a, b), q = ab(a) / g, m = ab(b);
    if (q > MAX / m) throw E('overflow_error', 'LCM overflows long long'); return q * m;
  },
  niropekkho: (n) => { nan(n, 'n'); return Math.abs(n); },
  nikotomo: (n) => { nan(n, 'n'); return toLL(Math.sign(n) * Math.round(Math.abs(n))); },
  nichetol: (n) => { nan(n, 'n'); return toLL(Math.floor(n)); },
  upertol: (n) => { nan(n, 'n'); return toLL(Math.ceil(n)); },
  shotangsho: two((n, p) => (n * p) / 100),
  ultasonkha: (n) => {
    let x = ab(n), r = 0n;
    while (x > 0n) { const d = x % 10n; if (r > (MAX - d) / 10n) throw E('overflow_error', 'Reversed number overflows long long'); r = r * 10n + d; x /= 10n; }
    return n < 0n ? -r : r;
  },
  onkojog: (n) => { let x = ab(n), s = 0n; while (x > 0n) { s += x % 10n; x /= 10n; } return s; },
  ghurpaksonkha: (n) => { if (n < 0n) return false; let x = n, r = 0n; while (x > 0n) { r = (r * 10n + (x % 10n)) & ((1n << 64n) - 1n); x /= 10n; } return r === n; },
};
// n = double, i = integer (long long / int), l = list of numbers
export const SIG = { jog: 'nn', biyog: 'nn', gun: 'nn', bhag: 'nn', bhagshesh: 'nn', ghat: 'nn', borgomul: 'n', ghonokfol: 'n', borgo: 'n', gorh: 'l', sarbadhik: 'l', sarbonimno: 'l', guniyo: 'i', jorno: 'i', bijorno: 'i', moulik: 'i', gosagu: 'ii', losagu: 'ii', niropekkho: 'n', nikotomo: 'n', nichetol: 'n', upertol: 'n', shotangsho: 'nn', ultasonkha: 'i', onkojog: 'i', ghurpaksonkha: 'i' };

export function call(id, args) {
  const s = SIG[id];
  const conv = args.map((x, i) => {
    if (s[i] === 'l') { if (!Array.isArray(x)) throw E('type_error', 'Expected a list like {1, 2, 3}'); return x.map(Number); }
    if (Array.isArray(x) || typeof x === 'boolean') throw E('type_error', 'Expected a number');
    return s[i] === 'i' ? big(Number(x)) : Number(x);
  });
  return IMPL[id](...conv);
}

// Format like C++ std::cout (6 significant digits, boolalpha)
export function fmt(v) {
  if (typeof v === 'bigint') return v.toString();
  if (typeof v === 'boolean') return String(v);
  if (Number.isNaN(v)) return 'nan';
  if (!Number.isFinite(v)) return v < 0 ? '-inf' : 'inf';
  if (v === 0) return '0';
  const ex = Math.floor(Math.log10(Math.abs(v)));
  if (ex < -4 || ex >= 6) {
    let [m, e] = v.toExponential(5).split('e');
    if (m.includes('.')) m = m.replace(/0+$/, '').replace(/\.$/, '');
    const n = parseInt(e, 10);
    return `${m}e${n < 0 ? '-' : '+'}${String(Math.abs(n)).padStart(2, '0')}`;
  }
  return String(parseFloat(v.toPrecision(6)));
}

// Tiny interpreter: jog(1, 2), gorh({1,2,3}), borgo(jog(2,3)), -5 ...
export function run(src) {
  const s = src.trim().replace(/;$/, '');
  if (!s) throw E('syntax_error', 'Type an expression first, e.g. jog(10, 5)');
  const re = /\s*(?:(\d+\.?\d*(?:e[+-]?\d+)?|\.\d+)|([A-Za-z_]\w*)|([(){}\[\],\-]))/y;
  const toks = []; let i = 0;
  while (i < s.length) {
    re.lastIndex = i; const m = re.exec(s);
    if (!m) throw E('syntax_error', `Unexpected character '${s.slice(i).trim()[0]}'`);
    toks.push(m[1] ? { k: 'n', v: m[1] } : m[2] ? { k: 'id', v: m[2] } : { k: 'p', v: m[3] });
    i = re.lastIndex;
  }
  let p = 0; const used = [];
  const peek = () => toks[p], next = () => toks[p++];
  const syn = (m) => E('syntax_error', m);
  const val = () => {
    const t = next();
    if (!t) throw syn('Expression ended unexpectedly');
    if (t.k === 'n') return parseFloat(t.v);
    if (t.v === '-') { const x = val(); if (typeof x === 'boolean' || Array.isArray(x)) throw syn("'-' needs a number"); return -x; }
    if (t.v === '{' || t.v === '[') {
      const close = t.v === '{' ? '}' : ']', arr = [];
      if (peek()?.v === close) { next(); return arr; }
      for (;;) {
        const x = val(); if (Array.isArray(x) || typeof x === 'boolean') throw syn('A list can only hold numbers');
        arr.push(Number(x)); const q = next();
        if (q?.v === close) break; if (q?.v !== ',') throw syn(`Expected ',' or '${close}' in the list`);
      }
      return arr;
    }
    if (t.k === 'id') {
      if (t.v === 'true') return true; if (t.v === 'false') return false;
      const sig = SIG[t.v];
      if (!sig) { const g = Object.keys(SIG).find((k) => k.slice(0, 3) === t.v.slice(0, 3)); throw E('name_error', `Unknown function '${t.v}'` + (g ? ` — did you mean ${g}?` : '')); }
      if (next()?.v !== '(') throw syn(`Write ${t.v}( ... ) with brackets`);
      const args = [];
      if (peek()?.v === ')') next();
      else for (;;) { args.push(val()); const q = next(); if (q?.v === ')') break; if (q?.v !== ',') throw syn("Expected ',' or ')'"); }
      if (args.length !== sig.length) throw E('arity_error', `${t.v}() needs ${sig.length} argument(s), got ${args.length}`);
      used.push(t.v);
      return call(t.v, args);
    }
    throw syn(`Unexpected '${t.v}'`);
  };
  const value = val();
  if (p < toks.length) throw syn(`Unexpected '${toks[p].v}'`);
  return { value, used };
}

// Check a challenge: {e: expected text, u: functions that must be used, err: expected error text}
export function grade(ch, src) {
  try {
    const r = run(src);
    if (ch.err) return { ok: false, msg: 'কোনো ত্রুটি হয়নি — এমন কল লেখো যেটা ত্রুটি দেয় (no error was thrown)' };
    if (ch.u && !ch.u.every((x) => r.used.includes(x))) return { ok: false, msg: `এই ফাংশন ব্যবহার করতে হবে (must use): ${ch.u.join(', ')}` };
    const out = fmt(r.value);
    return out === ch.e ? { ok: true, out } : { ok: false, msg: `ফলাফল ${out}, কিন্তু চাই ${ch.e} (got ${out}, wanted ${ch.e})` };
  } catch (e) {
    if (ch.err && e.message.includes(ch.err)) return { ok: true, out: `std::${e.kind}: ${e.message}` };
    return { ok: false, msg: `${e.kind || 'error'}: ${e.message}` };
  }
}
