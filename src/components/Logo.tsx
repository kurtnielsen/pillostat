interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  darkText?: boolean;
}

export default function Logo({ className = '', iconOnly = false, darkText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Pillow icon with medical cross and EKG */}
      <svg viewBox="0 0 48 44" className="w-10 h-10 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pillowGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f472b6' }} />
            <stop offset="100%" style={{ stopColor: '#ec4899' }} />
          </linearGradient>
        </defs>

        {/* Soft cloud-like pillow */}
        <path
          d="M8,36
             Q0,36 0,28
             Q0,20 8,18
             Q6,10 14,8
             Q22,4 30,8
             Q38,6 42,14
             Q48,16 48,24
             Q50,32 42,36
             Z"
          fill="url(#pillowGradLogo)"
        />

        {/* Medical cross subtle */}
        <rect x="20" y="14" width="8" height="20" rx="2" fill="white" opacity="0.3" />
        <rect x="14" y="20" width="20" height="8" rx="2" fill="white" opacity="0.3" />

        {/* EKG heartbeat line */}
        <polyline
          points="10,28 16,28 18,22 22,32 26,24 28,28 38,28"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {!iconOnly && (
        <span className="font-bold text-xl">
          <span className={darkText ? 'text-neutral-900' : 'text-white'}>pillow</span>
          <span className="text-pink-500">STAT</span>
        </span>
      )}
    </div>
  );
}
