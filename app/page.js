'use client';
import { useEffect, useState } from 'react';
import World from '../components/World';
import { Ic } from '../components/Ic';
import { Functions, Console, Practice } from '../components/Docs';

function Cube() {
  const [r, setR] = useState({ x: -18, y: 28 });

  const updateTilt = (clientX, clientY, rect) => {
    setR({
      x: -((clientY - rect.top) / rect.height - 0.5) * 65,
      y: ((clientX - rect.left) / rect.width - 0.5) * 130,
    });
  };

  return (
    <div
      className="hero-scene relative grid h-64 place-items-center overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-br from-emerald-50/90 via-stone-50 to-amber-50/70 shadow-xl shadow-stone-900/5 backdrop-blur dark:border-stone-800 dark:from-stone-900 dark:via-emerald-950/30 dark:to-stone-950 sm:h-80"
      onMouseMove={(e) => updateTilt(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => setR({ x: -18, y: 28 })}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          updateTilt(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget.getBoundingClientRect());
        }
      }}
    >

      <div className="orbit-ring h-52 w-52 sm:h-64 sm:w-64" />
      <div
        className="orbit-ring h-64 w-64 sm:h-80 sm:w-80"
        style={{ animationDirection: 'reverse', animationDuration: '32s' }}
      />

    
      <div className="pointer-events-none absolute bottom-6 h-5 w-32 rounded-full bg-emerald-950/20 blur-md dark:bg-emerald-400/15 sm:bottom-8 sm:w-40" />

      <div className="cube-wrap animate-float-slow" style={{ transform: `rotateX(${r.x}deg) rotateY(${r.y}deg)` }}>
        <div className="spin h-full w-full">
          {['+', '−', '×', '÷', '√', '∑'].map((s, i) => (
            <div key={i} className={`face f${i}`}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));

    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
    try {
      localStorage.setItem('gk-theme', d ? 'dark' : 'light');
    } catch {}
  };

  const nav = [
    ['#play', 'খেলা'],
    ['#functions', 'ফাংশন'],
    ['#console', 'কনসোল'],
    ['#practice', 'অনুশীলন'],
  ];

  return (
    <main className="bg-math-grid min-h-screen font-sans">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#faf8f5]/85 backdrop-blur-xl dark:border-stone-800/80 dark:bg-[#0b100e]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold text-emerald-800 dark:text-emerald-300 sm:text-2xl">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-700 text-sm text-amber-100 shadow-sm dark:bg-emerald-600">
              ∑
            </span>
            <span>
              গণিতকোষ{' '}
              <span className="text-xs font-medium text-stone-400 dark:text-stone-500">GonitKosh</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 dark:text-stone-300 md:flex">
            {nav.map(([h, t]) => (
              <a
                key={h}
                href={h}
                className="rounded-lg px-2.5 py-1.5 transition hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-stone-800/80 dark:hover:text-emerald-300"
              >
                {t}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="theme"
              className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-lg shadow-sm transition hover:border-emerald-400 active:scale-95 dark:border-stone-700 dark:bg-stone-900"
            >
              <i className={`fa-solid ${dark ? 'fa-sun text-amber-400' : 'fa-moon text-emerald-700'}`} />
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-lg text-stone-700 shadow-sm transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 md:hidden"
            >
              <Ic n={menuOpen ? 'fa-xmark' : 'fa-bars'} />
            </button>
          </div>
        </div>

        
        {menuOpen && (
          <nav className="animate-fade-up border-t border-stone-200/80 bg-[#faf8f5]/95 px-4 py-3 backdrop-blur-xl dark:border-stone-800 dark:bg-[#0b100e]/95 md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {nav.map(([h, t]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-stone-200/80 bg-white px-3 py-2.5 text-center text-sm font-semibold text-stone-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
                >
                  {t}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-8 pt-10 sm:pt-16 md:grid-cols-2 lg:gap-12">
        <div className="animate-fade-up">
          <div className="inline-block rounded-lg border border-amber-300/70 bg-amber-50/90 px-3 py-1 text-xs font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300">
            বাংলা ম্যাথ লাইব্রেরি · C++20
          </div>

          <h1 className="mt-3 pt-2 pb-1 text-5xl font-extrabold leading-[1.35] tracking-tight text-emerald-900 dark:text-emerald-300 sm:text-6xl lg:text-7xl">
            গণিতকোষ
          </h1>

          <p className="mt-2 text-lg font-bold text-stone-800 dark:text-stone-100 sm:text-xl">
            বাংলায় নাম, C++ এর শক্তি — গণিতের ভাণ্ডার।
          </p>

          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
            <code className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">jog</code>,{' '}
            <code className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">biyog</code>,{' '}
            <code className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">gun</code>,{' '}
            <code className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">bhag</code>… বাংলা নামের ফাংশন দিয়ে গণিত শেখো। ৮টি দ্বীপ পাড়ি দাও, তারা জেতো, আর নিজের ইনপুটে সব ফাংশন চালাও।
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#play" className="btn px-5 py-3 text-sm sm:text-base">
              <Ic n="fa-compass" /> যাত্রা শুরু করো
            </a>
            <a href="#functions" className="btn-secondary px-5 py-3 text-sm sm:text-base">
              ফাংশন দেখো
            </a>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          <Cube />
        </div>
      </section>

      <div className="reveal">
        <World />
      </div>
      <div className="reveal">
        <Functions />
      </div>
      <div className="reveal">
        <Console />
      </div>
      <div className="reveal">
        <Practice />
      </div>

      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-500 dark:border-stone-800/80 dark:text-stone-400 sm:text-sm">
        Develop By "Nil" 
      </footer>
    </main>
  );
}
