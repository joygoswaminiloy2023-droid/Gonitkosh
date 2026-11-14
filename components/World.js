'use client';
import { useEffect, useState } from 'react';
import { LEVELS, byId } from '../lib/data';
import { grade } from '../lib/gk';
import { Ic, Stars } from './Ic';

const POSD = [
  [12, 76],
  [23, 38],
  [35, 76],
  [48, 36],
  [61, 76],
  [74, 38],
  [86, 76],
  [86, 16],
];
const POSM = [
  [30, 8],
  [70, 20],
  [30, 32],
  [70, 44],
  [30, 56],
  [70, 68],
  [30, 80],
  [70, 92],
];
const BB = 'translateX(-50%) rotateX(-40deg)';

function Panel({ lv, onClose, onDone, onNext, hasNext }) {
  const [i, setI] = useState(0);
  const [vals, setVals] = useState({});
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [miss, setMiss] = useState(0);
  const [tries, setTries] = useState(0);
  const [fin, setFin] = useState(false);
  const ch = lv.ch[i];
  const sc = miss === 0 ? 3 : miss <= 2 ? 2 : 1;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = () => {
    const r = grade(ch, vals[i] || '');
    if (r.ok) {
      setOk(true);
      setMsg('সঠিক! ' + r.out);
    } else {
      setMiss((m) => m + 1);
      setTries((t) => t + 1);
      setMsg(r.msg);
    }
  };

  const advance = () => {
    if (i + 1 < lv.ch.length) {
      setI(i + 1);
      setOk(false);
      setMsg('');
      setTries(0);
    } else {
      setFin(true);
      onDone(lv.id, sc);
    }
  };

  const pct = Math.round(((fin ? lv.ch.length : i + (ok ? 1 : 0)) / lv.ch.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/65 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="card animate-modal-in max-h-[92vh] w-full max-w-2xl overflow-y-auto !border-stone-200 !bg-[#faf8f5] !p-5 shadow-2xl dark:!border-stone-700 dark:!bg-stone-900 sm:!p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-700 text-xl text-amber-100 shadow-md dark:bg-emerald-600">
              <Ic n={lv.icon} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold sm:text-2xl">{lv.bn}</h3>
              <div className="text-xs font-medium text-stone-500 dark:text-stone-400 sm:text-sm">
                Level {lv.id} · {lv.en}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="বন্ধ করো"
            className="grid h-9 w-9 place-items-center rounded-xl text-stone-400 transition hover:bg-stone-200/60 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <Ic n="fa-xmark" className="text-lg" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">{lv.t}</p>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {lv.fns.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-200 sm:text-sm"
            >
              <b className="font-mono text-emerald-700 dark:text-emerald-300">{id}</b>
              <span className="opacity-50">:</span>
              <span>{byId[id].en}</span>
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
            <span>
              চ্যালেঞ্জ {Math.min(i + 1, lv.ch.length)} / {lv.ch.length}
            </span>
            <span>ভুল: {miss}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500 dark:bg-emerald-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <hr className="my-5 border-stone-200/80 dark:border-stone-800" />

        {!fin ? (
          <div>
            <p className="text-base font-bold text-stone-800 dark:text-stone-100 sm:text-lg">{ch.q}</p>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <input
                className="inp font-mono"
                placeholder="যেমন: jog(2, 3)"
                value={vals[i] || ''}
                disabled={ok}
                onChange={(e) => setVals({ ...vals, [i]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && !ok && submit()}
              />
              <button className="btn shrink-0 sm:px-5" onClick={submit} disabled={ok}>
                চালাও <Ic n="fa-play" className="text-xs" />
              </button>
            </div>

            {msg && (
              <div
                className={`mt-3 flex items-start gap-2 rounded-xl border p-3 font-mono text-xs sm:text-sm ${
                  ok
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/60 dark:bg-rose-950/50 dark:text-rose-300'
                }`}
              >
                <Ic n={ok ? 'fa-circle-check' : 'fa-circle-xmark'} className="mt-0.5 shrink-0" />
                <span className="break-all">{msg}</span>
              </div>
            )}

            {tries >= 2 && !ok && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200 sm:text-sm">
                <Ic n="fa-lightbulb" className="shrink-0 text-amber-500" />
                <span>
                  ইঙ্গিত (hint): <code className="font-mono font-semibold">{ch.h}</code>
                </span>
              </div>
            )}

            {ok && (
              <button className="btn mt-4 w-full sm:w-auto" onClick={advance}>
                {i + 1 < lv.ch.length ? (
                  <>
                    পরের চ্যালেঞ্জ <Ic n="fa-arrow-right" />
                  </>
                ) : (
                  <>
                    দ্বীপ শেষ করো <Ic n="fa-trophy" />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="py-2 text-center">
            <div className="text-4xl tracking-widest sm:text-5xl">
              <Stars n={sc} animated />
            </div>
            <p className="mt-3 text-xl font-extrabold text-stone-900 dark:text-white">
              অভিনন্দন! {miss} টি ভুল করেছ।
            </p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 sm:text-sm">
              ০ ভুল = ৩ তারা · ১–২ ভুল = ২ তারা · ৩+ ভুল = ১ তারা
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
              {hasNext && (
                <button className="btn" onClick={onNext}>
                  পরের দ্বীপে হাঁটো <Ic n="fa-arrow-right" />
                </button>
              )}
              <button className="btn-secondary" onClick={onClose}>
                মানচিত্রে ফিরো
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function World() {
  const [pg, setPg] = useState({});
  const [at, setAt] = useState(0);
  const [open, setOpen] = useState(null);
  const [walking, setWalking] = useState(false);
  const [toast, setToast] = useState('');
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const f = () => setMob(window.innerWidth < 720);
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);

  const POS = mob ? POSM : POSD;

  useEffect(() => {
    try {
      setPg(JSON.parse(localStorage.getItem('gk-progress') || '{}'));
    } catch {}
  }, []);

  const save = (id, s) => {
    const n = { ...pg, [id]: Math.max(pg[id] || 0, s) };
    setPg(n);
    try {
      localStorage.setItem('gk-progress', JSON.stringify(n));
    } catch {}
  };

  const locked = (i) => i > 0 && !pg[LEVELS[i - 1].id];

  const go = (i) => {
    if (walking) return;
    if (locked(i)) {
      setToast('আগের দ্বীপ শেষ করো (finish the previous island first)');
      setTimeout(() => setToast(''), 2400);
      return;
    }
    if (i === at) {
      setOpen(i);
      return;
    }
    setAt(i);
    setWalking(true);
    setTimeout(() => {
      setWalking(false);
      setOpen(i);
    }, 1450);
  };

  const total = Object.values(pg).reduce((a, b) => a + b, 0);
  const maxStars = LEVELS.length * 3;
  const reset = () => {
    setPg({});
    setAt(0);
    try {
      localStorage.removeItem('gk-progress');
    } catch {}
  };

  return (
    <section id="play" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/70 dark:bg-teal-950/60 dark:text-teal-300">
            <Ic n="fa-map-location-dot" /> ইন্টারঅ্যাক্টিভ ৩ডি মানচিত্র
          </span>
          <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <Ic n="fa-compass" className="mr-2 text-emerald-700 dark:text-emerald-400" />
            দ্বীপে দ্বীপে খেলা{' '}
            <span className="text-base font-medium text-stone-400 dark:text-stone-500 sm:text-lg">
              Island Quest
            </span>
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
            একটি দ্বীপে ক্লিক করলে তুমি হেঁটে সেখানে যাবে। ভুল কম = বেশি তারা!
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-amber-200/80 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur dark:border-amber-900/40 dark:bg-stone-900/80 sm:justify-end">
          <div>
            <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 sm:text-2xl">
              <Ic n="fa-star" className="mr-1" />
              {total} <span className="text-sm font-semibold text-stone-400">/ {maxStars}</span>
            </div>
            <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.round((total / maxStars) * 100)}%` }}
              />
            </div>
          </div>
          <button
            onClick={reset}
            className="rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-semibold text-stone-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-stone-700 dark:text-stone-400 dark:hover:border-rose-800 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
          >
            রিসেট
          </button>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-3xl border border-teal-200/80 shadow-2xl shadow-teal-950/10 dark:border-stone-800 dark:shadow-black/50">
        <div
          className="scene relative w-full overflow-hidden"
          style={{ height: mob ? 900 : 620, '--is': mob ? '72px' : '108px' }}
        >
          <div className="ocean-clouds" />

          <div className="plane">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={POS.map((p) => p.join(',')).join(' ')}
                fill="none"
                stroke="#fef3c7"
                strokeWidth="3"
                strokeDasharray="1.5 3.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.72"
              />
            </svg>

            {LEVELS.map((lv, i) => {
              const lk = locked(i);
              const s = pg[lv.id] || 0;
              const isCurrent = at === i;
              return (
                <div
                  key={lv.id}
                  className="island-node absolute cursor-pointer select-none"
                  style={{
                    left: POS[i][0] + '%',
                    top: POS[i][1] + '%',
                    transformStyle: 'preserve-3d',
                    zIndex: isCurrent ? 3 : 1,
                  }}
                  onClick={() => go(i)}
                >
                  {!lk && (
                    <div
                      className="water-ripple"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  )}

                  <div
                    className="isl"
                    style={{
                      filter: lk
                        ? 'saturate(0.25) brightness(0.78)'
                        : isCurrent
                          ? 'drop-shadow(0 0 18px rgba(251, 191, 36, 0.72))'
                          : 'drop-shadow(0 8px 16px rgba(15, 23, 42, 0.35))',
                      animationDelay: i * 0.4 + 's',
                    }}
                  >
                    {[5, 4, 3, 2, 1, 0].map((k) => {
                      const bg =
                        k === 0
                          ? 'radial-gradient(circle at 35% 32%, var(--grass1), var(--grass2))'
                          : k === 1
                            ? 'radial-gradient(circle at 40% 40%, var(--sand), var(--sand-edge))'
                            : 'linear-gradient(145deg, var(--dirt1), var(--dirt2))';
                      return (
                        <span
                          key={k}
                          className="layer"
                          style={{
                            transform: `translateZ(${-k * 5.5}px) scale(${k === 1 ? 1.07 : 1 - k * 0.015})`,
                            background: bg,
                            filter: k > 1 ? `brightness(${1 - k * 0.08})` : 'none',
                            boxShadow:
                              k === 0
                                ? 'inset 0 2px 6px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.22)'
                                : 'none',
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Floating Billboard Label */}
                  <div className="bb" style={{ transform: BB + ' translateY(-8px)' }}>
                    <div
                      className={`mx-auto grid place-items-center rounded-full border-2 border-white/85 text-white shadow-lg transition-transform ${
                        lk
                          ? 'bg-stone-500'
                          : s > 0
                            ? 'bg-emerald-600'
                            : 'bg-amber-600'
                      } ${mob ? 'h-9 w-9 text-sm' : 'h-12 w-12 text-lg'}`}
                    >
                      <Ic n={lk ? 'fa-lock' : lv.icon} />
                    </div>
                    <div className="mt-1 rounded-xl border border-white/60 bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-stone-800 shadow-md backdrop-blur dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-100 sm:text-xs">
                      {lv.id}. {lv.bn}
                    </div>
                    <div className="mt-0.5 text-xs drop-shadow sm:text-sm">
                      <Stars n={s} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Explorer Avatar */}
            <div
              className="pointer-events-none absolute"
              style={{
                left: POS[at][0] + '%',
                top: POS[at][1] + '%',
                transformStyle: 'preserve-3d',
                transition: 'left 1.4s cubic-bezier(0.45, 0, 0.55, 1), top 1.4s cubic-bezier(0.45, 0, 0.55, 1)',
                zIndex: 5,
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-950/35 blur-[3px]"
                style={{ transform: 'translate(-50%, -50%) translateZ(2px)' }}
              />
              <div
                className="bb"
                style={{
                  width: mob ? 52 : 76,
                  height: mob ? 52 : 76,
                  transform: BB + ' translateZ(42px)',
                }}
              >
                <div className={`h-full w-full ${walking ? 'walk' : ''}`}>
                  <img
                    src="/scholar.png"
                    alt="Explorer"
                    className="block h-full w-full max-w-none rounded-full border-2 border-white/90 bg-emerald-900/60 object-cover drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {toast && (
          <div className="animate-toast-in shake absolute left-1/2 top-4 z-20 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-center gap-2 rounded-2xl border border-stone-700 bg-stone-900/95 px-4 py-2.5 text-center text-xs font-medium text-white shadow-2xl backdrop-blur sm:text-sm">
            <Ic n="fa-lock" className="text-amber-400" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {open !== null && (
        <Panel
          key={open}
          lv={LEVELS[open]}
          onClose={() => setOpen(null)}
          onDone={save}
          hasNext={open + 1 < LEVELS.length}
          onNext={() => {
            const n = open + 1;
            setOpen(null);
            setTimeout(() => go(n), 100);
          }}
        />
      )}
    </section>
  );
}