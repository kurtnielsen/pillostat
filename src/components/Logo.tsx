interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  darkBackground?: boolean;
}

export default function Logo({ className = '', iconOnly = false, darkBackground = false }: LogoProps) {
  // Use a unique ID to avoid SVG gradient conflicts when multiple logos on page
  const gradientId = `pillowGrad-${darkBackground ? 'dark' : 'light'}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Minimal pillow outline with EKG cutting through */}
      <svg viewBox="0 0 48 44" className="w-10 h-10 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#6366f1' }} />
            <stop offset="100%" style={{ stopColor: '#ec4899' }} />
          </linearGradient>
        </defs>

        {/* Simple pillow outline */}
        <rect
          x="4"
          y="10"
          width="40"
          height="28"
          rx="8"
          fill={darkBackground ? 'rgba(255,255,255,0.1)' : 'none'}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
        />

        {/* EKG line through center */}
        <polyline
          points="0,24 10,24 14,24 18,12 24,36 30,18 34,24 40,24 48,24"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {!iconOnly && (
        <span className="font-bold text-xl">
          <span className={darkBackground ? 'text-white' : 'text-neutral-900'}>pillow</span>
          <span className="text-pink-500">STAT</span>
        </span>
      )}
    </div>
  );
}
