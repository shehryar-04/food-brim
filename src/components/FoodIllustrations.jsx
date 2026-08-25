// High-fidelity, lightweight SVG food & botanical ingredient illustrations
// Tailored for FoodBrim's authentic desi cuisine aesthetic.

export function StarAnise({ className = "w-12 h-12", ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="starAniseGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="60%" stopColor="#5C2E0B" />
          <stop offset="100%" stopColor="#3B1D06" />
        </radialGradient>
        <linearGradient id="seedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <filter id="starShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#starShadow)">
        {/* 8 Radial Carpels */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            {/* Pod Carpel Boat */}
            <path
              d="M50 50 C44 38, 41 22, 50 10 C59 22, 56 38, 50 50 Z"
              fill="url(#starAniseGrad)"
              stroke="#2B1504"
              strokeWidth="1.2"
            />
            {/* Pod Ridge Inner */}
            <path
              d="M50 42 C47 34, 46 24, 50 16 C54 24, 53 34, 50 42 Z"
              fill="#422006"
              opacity="0.85"
            />
            {/* Glossy Exposed Seed */}
            <ellipse
              cx="50"
              cy="27"
              rx="3.2"
              ry="5.2"
              fill="url(#seedGrad)"
            />
            {/* Seed Highlight */}
            <ellipse
              cx="49"
              cy="25"
              rx="1.2"
              ry="2"
              fill="#FEF3C7"
              opacity="0.8"
            />
          </g>
        ))}
        {/* Central Core Hub */}
        <circle cx="50" cy="50" r="8" fill="#3B1D06" stroke="#1F0E03" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4.5" fill="#5C2E0B" />
        <circle cx="48.5" cy="48.5" r="1.5" fill="#B45309" opacity="0.8" />
      </g>
    </svg>
  );
}

export function CardamomPod({ className = "w-10 h-10", ...props }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="cardamomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="35%" stopColor="#1E5B3C" />
          <stop offset="85%" stopColor="#143D28" />
          <stop offset="100%" stopColor="#0B2316" />
        </linearGradient>
        <filter id="cardamomShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#cardamomShadow)" transform="rotate(-15 40 40)">
        {/* Outer Oval Pod Body */}
        <path
          d="M40 12 C54 22, 62 44, 52 64 C46 72, 34 72, 28 64 C18 44, 26 22, 40 12 Z"
          fill="url(#cardamomGrad)"
          stroke="#0F3320"
          strokeWidth="1.5"
        />
        {/* Longitudinal Ribs / Ridges */}
        <path
          d="M40 13 Q48 38 46 66"
          stroke="#86EFAC"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M40 13 Q34 38 34 66"
          stroke="#86EFAC"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M40 13 Q55 40 50 63"
          stroke="#14532D"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Tail Stem and Crown Tips */}
        <path
          d="M40 12 L41 7 L39 7 Z"
          fill="#14532D"
          stroke="#0F3320"
          strokeWidth="1"
        />
        <circle cx="40" cy="67" r="2" fill="#0B2316" />
        {/* Delicate Surface Highlight */}
        <path
          d="M33 26 C31 36, 31 48, 35 56"
          stroke="#BBF7D0"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

export function ChiliPepper({ className = "w-12 h-12", ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="chiliBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="45%" stopColor="#DC2626" />
          <stop offset="85%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="chiliCalyx" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <filter id="chiliShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#chiliShadow)" transform="rotate(20 50 50)">
        {/* Curving Pepper Body */}
        <path
          d="M52 24 C62 38, 76 60, 58 84 C48 76, 44 54, 42 32 C42 26, 48 24, 52 24 Z"
          fill="url(#chiliBodyGrad)"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />
        {/* Glossy Curved Highlight Streak */}
        <path
          d="M50 30 C53 42, 60 58, 54 74"
          stroke="#FECACA"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Secondary Delicate Sheen */}
        <path
          d="M48 34 C50 44, 55 54, 52 64"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Green Calyx Cap & Crown */}
        <path
          d="M40 28 C44 24, 54 22, 58 28 C56 31, 52 33, 49 31 C46 33, 43 32, 40 28 Z"
          fill="url(#chiliCalyx)"
          stroke="#14532D"
          strokeWidth="1"
        />
        {/* Curved Stem */}
        <path
          d="M49 24 C48 18, 44 14, 38 12"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function LemonSlice({ className = "w-12 h-12", ...props }) {
  return (
    <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="lemonRind" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <radialGradient id="lemonPulp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </radialGradient>
        <filter id="lemonShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#lemonShadow)" transform="rotate(-10 45 45)">
        {/* Outer Yellow Zest */}
        <circle cx="45" cy="45" r="38" fill="url(#lemonRind)" stroke="#A16207" strokeWidth="1.2" />
        {/* White Inner Pith Ring */}
        <circle cx="45" cy="45" r="34" fill="#FEFCE8" stroke="#FEF08A" strokeWidth="0.8" />
        {/* Central Axis Core */}
        <circle cx="45" cy="45" r="5" fill="#FEFCE8" />
        {/* 8 Pulp Wedges */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 45 45)`}>
            <path
              d="M45 40 L45 15 C52 16, 58 20, 62 26 L48 41 Z"
              fill="url(#lemonPulp)"
              stroke="#FEFCE8"
              strokeWidth="1"
            />
            {/* Tiny Pulp Vesicle Dots */}
            <circle cx="49" cy="24" r="1" fill="#FEF9C3" opacity="0.9" />
            <circle cx="53" cy="28" r="0.9" fill="#FEF9C3" opacity="0.8" />
          </g>
        ))}
        {/* Glassy Citrus Highlight Rim */}
        <path
          d="M20 22 C32 12, 58 12, 70 22"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

export function HerbLeaf({ className = "w-10 h-10", ...props }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="herbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="40%" stopColor="#1E5B3C" />
          <stop offset="100%" stopColor="#0F3320" />
        </linearGradient>
        <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter="url(#leafShadow)" transform="rotate(35 40 40)">
        {/* Serrated Coriander/Mint Leaf Blade */}
        <path
          d="M40 10 C55 22, 62 42, 48 65 C40 58, 38 64, 38 72 C36 68, 34 58, 28 54 C18 42, 24 22, 40 10 Z"
          fill="url(#herbGrad)"
          stroke="#0F3320"
          strokeWidth="1.2"
        />
        {/* Central Leaf Vein */}
        <path
          d="M40 12 Q38 42 38 72"
          stroke="#86EFAC"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Side Lateral Veins */}
        <path d="M39 28 Q48 24 53 26" stroke="#86EFAC" strokeWidth="1" opacity="0.6" />
        <path d="M39 40 Q49 38 52 42" stroke="#86EFAC" strokeWidth="1" opacity="0.6" />
        <path d="M39 28 Q31 24 26 27" stroke="#86EFAC" strokeWidth="1" opacity="0.6" />
        <path d="M39 40 Q29 38 27 43" stroke="#86EFAC" strokeWidth="1" opacity="0.6" />
        {/* Dew Drop / Gloss Reflection */}
        <circle cx="34" cy="30" r="2.2" fill="#DCFCE7" opacity="0.75" />
        <circle cx="33.5" cy="29.5" r="0.8" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function CinnamonQuill({ className = "w-12 h-12", ...props }) {
  return (
    <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="cinnamonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A46A3A" />
          <stop offset="40%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <filter id="cinnamonShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#cinnamonShadow)" transform="rotate(-30 45 45)">
        {/* Rolled Outer Bark Cylinder */}
        <rect x="22" y="15" width="46" height="60" rx="6" fill="url(#cinnamonGrad)" stroke="#2B1002" strokeWidth="1.2" />
        {/* Scroll Rolled Edges */}
        <ellipse cx="45" cy="15" rx="23" ry="5" fill="#92400E" stroke="#2B1002" strokeWidth="1" />
        <ellipse cx="45" cy="15" rx="14" ry="3" fill="#451A03" />
        <ellipse cx="45" cy="75" rx="23" ry="5" fill="#451A03" stroke="#2B1002" strokeWidth="1" />
        {/* Woodgrain Bark Texture Lines */}
        <line x1="28" y1="20" x2="28" y2="70" stroke="#B45309" strokeWidth="1.2" opacity="0.6" />
        <line x1="38" y1="24" x2="38" y2="68" stroke="#D97706" strokeWidth="1.5" opacity="0.4" />
        <line x1="52" y1="18" x2="52" y2="72" stroke="#2B1002" strokeWidth="1.2" opacity="0.7" />
        <line x1="60" y1="22" x2="60" y2="66" stroke="#B45309" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  );
}

export function RiceGrains({ className = "w-10 h-10", ...props }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="riceGrain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      {/* 3 Scattered Aged Basmati Grains & Saffron Filament */}
      <g transform="rotate(25 35 35)">
        {/* Grain 1 */}
        <ellipse cx="30" cy="24" rx="4.5" ry="14" transform="rotate(-30 30 24)" fill="url(#riceGrain)" stroke="#D97706" strokeWidth="0.8" />
        {/* Grain 2 */}
        <ellipse cx="44" cy="38" rx="4" ry="13" transform="rotate(40 44 38)" fill="url(#riceGrain)" stroke="#D97706" strokeWidth="0.8" />
        {/* Saffron Filament */}
        <path
          d="M20 48 Q32 40 38 46 T52 42"
          stroke="#DC2626"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="52" cy="42" r="1.5" fill="#EF4444" />
      </g>
    </svg>
  );
}
