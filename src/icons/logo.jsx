import React from "react";

export function BrandLogo({ className = "w-10 h-10", color = "#A46A3A" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 4 Fork Tines */}
      <path d="M38 18 V33 M41.5 18 V33 M45 18 V33 M48.5 18 V33" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Fork Head base curve */}
      <path d="M38 33 C38 43, 48.5 43, 48.5 33" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Fork Stem forming the straight line of the "B" */}
      <path d="M43.25 39 V82" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Fork base stand / flat foot */}
      <path d="M34 82 H52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Elegant B loop curves on the right */}
      <path
        d="M51.5 32 C69 32, 69 52, 51.5 52 C73 52, 73 75, 51.5 75"
        stroke={color}
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BrandTagline() {
  return (
    <div className="text-center font-serif">
      <h3 className="text-sm font-semibold tracking-wider text-[#A46A3A] uppercase">
        Filled to the Brim
      </h3>
      <p className="font-script text-[#1E5B3C] text-lg mt-0.5">
        with Homemade Goodness
      </p>
    </div>
  );
}
