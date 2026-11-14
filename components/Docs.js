'use client';
import { useEffect, useRef, useState } from 'react';
import { FUNCS, PROBLEMS } from '../lib/data';
import { call, fmt, run, grade } from '../lib/gk';
import { Ic } from './Ic';

const parseArg = (a, s) => {
  if (a.k === 'l') return s.split(',').map((x) => (x.trim() === '' ? NaN : Number(x)));
  return s.trim() === '' ? NaN : Number(s);
};

const callText = (f, vals) =>
  `${f.id}(${f.args
    .map((a, i) =>
      a.k === 'l'
        ? `{${vals[i]
            .split(',')
            .map((x) => x.trim())
            .join(', ')}}`
        : vals[i].trim()
    )
    .join(', ')})`;

function FuncCard({ f }) {
  const [vals, setVals] = useState(f.ex);
  const [out, setOut] = useState(null);

  const exec = () => {
    try {
      setOut({ ok: true, t: fmt(call(f.id, f.args.map((a, i) => parseArg(a, vals[i])))) });
    } catch (e) {
      setOut({ ok: false, t: `std::${e.kind}: ${e.message}` });
    }
  };

  return (
    <div className="card-interactive flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg bg-amber-100/80 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
            {f.bn}
          </span>
          <span className="font-mono text-[11px] text-stone-400 dark:text-stone-500">{f.ret}</span>
        </div>

        <h3 className="mt-2.5 text-lg font-extrabold tracking-tight sm:text-xl">
          <span className="font-mono text-emerald-700 dark:text-emerald-400">{f.id}</span>
          <span className="mx-1.5 text-stone-300 dark:text-stone-600">:</span>
          <span className="text-stone-800 dark:text-stone-200">{f.en}</span>
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{f.d}</p>
        <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">{f.de}</p>

        <code className="mt-3 block overflow-x-auto whitespace-nowrap rounded-xl border border-stone-200/80 bg-stone-100/90 px-3 py-2 font-mono text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-950/80 dark:text-stone-300">
          <span className="text-amber-700 dark:text-amber-400">{f.ret}</span>{' '}
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">{f.id}</span>(
          {f.args
            .map((a) => (a.k === 'l' ? 'list ' : a.k === 'i' ? 'long long ' : 'double ') + a.n)
            .join(', ')}
          )
        </code>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-end gap-2">
          {f.args.map((a, i) => (
            <label key={a.n} className="min-w-[84px] flex-1 text-xs font-semibold text-stone-500 dark:text-stone-400">
              {a.n}
              <input
                className="inp mt-1 font-mono"
                value={vals[i]}
                onChange={(e) => setVals(vals.map((v, j) => (j === i ? e.target.value : v)))}
                onKeyDown={(e) => e.key === 'Enter' && exec()}
              />
            </label>
          ))}
          <button className="btn w-full shrink-0 sm:w-auto" onClick={exec}>
            চালাও <Ic n="fa-play" className="text-xs" />
          </button>
        </div>

        {out && (
          <div
            className={`mt-3 animate-fade-up rounded-xl border p-2.5 font-mono text-xs sm:text-sm ${
              out.ok
                ? 'border-emerald-200 bg-emerald-50/90 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-rose-200 bg-rose-50/90 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            <div className="truncate text-[11px] opacity-65">{callText(f, vals)}</div>
            <div className="mt-0.5 break-all font-bold">
              {out.ok ? '= ' : ''}
              {out.t}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Functions() {
  return (
    <section id="functions" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300">
          <Ic n="fa-cubes" /> ২৬টি বিল্ট-ইন ফাংশন
        </span>
        <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <Ic n="fa-book-open" className="mr-2 text-emerald-700 dark:text-emerald-400" />
          ফাংশন ল্যাব{' '}
          <span className="text-base font-medium text-stone-400 dark:text-stone-500 sm:text-lg">
            Function Lab
          </span>
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
          প্রতিটি ফাংশনের নিচে নিজের সংখ্যা বসিয়ে চালাও। ভুল দিলে C++ এর মতোই ত্রুটি দেখাবে।
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FUNCS.map((f) => (
          <FuncCard key={f.id} f={f} />
        ))}
      </div>
    </section>
  );
}

export function Console() {
  const [src, setSrc] = useState('borgo(jog(2, 3))');
  const [log, setLog] = useState([]);
  const end = useRef(null);

  const exec = (s = src) => {
    let r;
    try {
      const x = run(s);
      r = { ok: true, t: fmt(x.value) };
    } catch (e) {
      r = {
        ok: false,
        t: `${e.kind === 'syntax_error' || e.kind === 'name_error' || e.kind === 'arity_error' ? '' : 'std::'}${e.kind}: ${e.message}`,
      };
    }
    setLog((l) => [...l.slice(-19), { s, ...r }]);
  };

  useEffect(() => {
    end.current?.parentElement.scrollTo({ top: 1e6, behavior: 'smooth' });
  }, [log]);

  return (
    <section id="console" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Ic n="fa-code" /> লাইভ ইন্টারপ্রেটার
        </span>
        <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <Ic n="fa-terminal" className="mr-2 text-emerald-700 dark:text-emerald-400" />
          সব ফাংশন এক জায়গায়{' '}
          <span className="text-base font-medium text-stone-400 dark:text-stone-500 sm:text-lg">
            All-in-one Console
          </span>
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
          যেকোনো এক্সপ্রেশন লেখো — ফাংশনের ভেতরে ফাংশনও চলবে। তালিকার জন্য {'{1, 2, 3}'} লেখো।
        </p>
      </div>

      {/* Realistic IDE Terminal Window */}
      <div className="card !p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200/80 bg-stone-100/90 px-4 py-2.5 dark:border-stone-800 dark:bg-stone-950/90">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
            <span className="ml-2 font-mono text-xs font-medium text-stone-500 dark:text-stone-400">
              gonitkosh — cpp20-repl
            </span>
          </div>
          {log.length > 0 && (
            <button
              onClick={() => setLog([])}
              className="rounded-lg px-2 py-1 font-mono text-[11px] font-semibold text-stone-500 transition hover:bg-stone-200/70 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            >
              clear
            </button>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="h-52 overflow-y-auto rounded-xl border border-stone-800 bg-stone-950 p-3.5 font-mono text-xs leading-relaxed text-emerald-300 shadow-inner sm:text-sm">
            {log.length === 0 && (
              <div className="text-stone-500">// নিচে এক্সপ্রেশন লেখো, Enter চাপো অথবা উদাহরণে ক্লিক করো…</div>
            )}
            {log.map((l, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <div className="text-amber-300">
                  <span className="mr-1.5 text-stone-500">❯</span>
                  {l.s}
                </div>
                <div className={l.ok ? 'pl-4 font-semibold text-emerald-300' : 'pl-4 text-rose-400'}>
                  {l.ok ? '= ' : ''}
                  {l.t}
                </div>
              </div>
            ))}
            <div ref={end} />
          </div>

          <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row">
            <input
              className="inp font-mono"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && exec()}
              placeholder="gosagu(48, 36)"
            />
            <button className="btn shrink-0 sm:px-6" onClick={() => exec()}>
              চালাও <Ic n="fa-play" className="text-xs" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {FUNCS.map((f) => {
              const t = callText(f, f.ex);
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSrc(t);
                    exec(t);
                  }}
                  className="rounded-full border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-900 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/70 sm:text-xs"
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cheat-sheet Table */}
      <div className="card mt-6">
        <h3 className="mb-3 text-lg font-bold sm:text-xl">
          <Ic n="fa-list" className="mr-2 text-emerald-700 dark:text-emerald-400" />
          সব ফাংশনের তালিকা (Cheat-sheet)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200/80 dark:border-stone-800">
          <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
            <thead className="bg-stone-100/90 text-stone-600 dark:bg-stone-950/80 dark:text-stone-300">
              <tr>
                <th className="px-3 py-2.5 font-semibold">#</th>
                <th className="px-3 py-2.5 font-semibold">বাংলা</th>
                <th className="px-3 py-2.5 font-semibold">ফাংশন : English</th>
                <th className="px-3 py-2.5 font-semibold">কাজ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800/80">
              {FUNCS.map((f, i) => (
                <tr
                  key={f.id}
                  className="transition-colors hover:bg-emerald-50/60 dark:hover:bg-stone-800/40"
                >
                  <td className="px-3 py-2 font-mono text-xs text-stone-400">{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{f.bn}</td>
                  <td className="px-3 py-2 font-mono">
                    <b className="text-emerald-700 dark:text-emerald-400">{f.id}</b>
                    <span className="mx-1 text-stone-400">:</span>
                    <span>{f.en}</span>
                  </td>
                  <td className="px-3 py-2 text-stone-600 dark:text-stone-300">{f.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Practice() {
  const [done, setDone] = useState([]);
  const [vals, setVals] = useState({});
  const [msg, setMsg] = useState({});
  const [show, setShow] = useState({});

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem('gk-practice') || '[]'));
    } catch {}
  }, []);

  const check = (i) => {
    const r = grade(PROBLEMS[i], vals[i] || '');
    setMsg({ ...msg, [i]: { ok: r.ok, t: r.ok ? 'সঠিক! ' + r.out : r.msg } });
    if (r.ok && !done.includes(i)) {
      const n = [...done, i];
      setDone(n);
      try {
        localStorage.setItem('gk-practice', JSON.stringify(n));
      } catch {}
    }
  };

  return (
    <section id="practice" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300">
            <Ic n="fa-award" /> অনুশীলনী সেট
          </span>
          <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <Ic n="fa-brain" className="mr-2 text-emerald-700 dark:text-emerald-400" />
            অনুশীলন{' '}
            <span className="text-base font-medium text-stone-400 dark:text-stone-500 sm:text-lg">
              Easy Problems · {done.length}/{PROBLEMS.length}
            </span>
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
            সহজ সমস্যা — GonitKosh ফাংশন দিয়ে উত্তর বের করো।
          </p>
        </div>

        <div className="w-full sm:w-48">
          <div className="mb-1 flex justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
            <span>অগ্রগতি</span>
            <span>{Math.round((done.length / PROBLEMS.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500 dark:bg-emerald-500"
              style={{ width: `${Math.round((done.length / PROBLEMS.length) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROBLEMS.map((p, i) => {
          const isDone = done.includes(i);
          return (
            <div
              key={i}
              className={`card-interactive ${
                isDone ? '!border-emerald-400/80 dark:!border-emerald-700/70' : ''
              }`}
            >
              <div className="flex items-start gap-2.5 font-semibold">
                <Ic
                  n={isDone ? 'fa-circle-check' : 'fa-circle'}
                  className={`mt-1 shrink-0 ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}
                />
                <span className="text-sm sm:text-base">
                  সমস্যা {i + 1}: {p.q}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  className="inp font-mono"
                  placeholder="ফাংশন লেখো…"
                  value={vals[i] || ''}
                  onChange={(e) => setVals({ ...vals, [i]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && check(i)}
                />
                <button className="btn shrink-0 sm:px-5" onClick={() => check(i)}>
                  যাচাই
                </button>
              </div>

              {msg[i] && (
                <div
                  className={`mt-2.5 flex items-start gap-2 rounded-xl p-2 font-mono text-xs sm:text-sm ${
                    msg[i].ok
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                  }`}
                >
                  <Ic
                    n={msg[i].ok ? 'fa-circle-check' : 'fa-circle-xmark'}
                    className="mt-0.5 shrink-0"
                  />
                  <span className="break-all">{msg[i].t}</span>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  className="text-xs font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 transition hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-300"
                  onClick={() => setShow({ ...show, [i]: !show[i] })}
                >
                  {show[i] ? 'সমাধান লুকাও' : 'সমাধান দেখো'}
                </button>
                {show[i] && (
                  <code className="rounded-lg bg-stone-100 px-2 py-0.5 font-mono text-xs text-emerald-800 dark:bg-stone-800 dark:text-emerald-300">
                    {p.s}
                  </code>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
