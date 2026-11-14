module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Bengali"', '"Hind Siliguri"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        starPop: {
          '0%': { opacity: '0', transform: 'scale(0.3) rotate(-25deg)' },
          '65%': { opacity: '1', transform: 'scale(1.22) rotate(6deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, -14px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0) scale(1)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'modal-in': 'modalIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'star-pop': 'starPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'toast-in': 'toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
