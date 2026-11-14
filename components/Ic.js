// Font Awesome helpers (CSS loaded in app/layout.js)
export const Ic = ({ n, className = '' }) => (
  <i className={`fa-solid ${n} ${className}`} aria-hidden="true" />
);

export const Stars = ({ n, className = '', animated = false }) => (
  <span className={`inline-flex items-center gap-0.5 ${className}`}>
    {[0, 1, 2].map((i) => (
      <i
        key={i}
        style={animated && i < n ? { animationDelay: `${i * 140}ms` } : undefined}
        className={`${i < n ? 'fa-solid text-amber-400' : 'fa-regular text-amber-400/40'} fa-star ${
          animated && i < n ? 'animate-star-pop opacity-0' : ''
        }`}
      />
    ))}
  </span>
);
