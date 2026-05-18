import React from 'react';

/**
 * A wrapper component that applies a hand-drawn SVG-masked border.
 * Uses the CSS filter defined in index.css.
 */
export const RoughInkBorder = ({ children, className = "", style = {} }) => {
  return (
    <div className={`rough-border relative inline-block ${className}`} style={style}>
      <div className="relative z-10 px-4 py-2">
        {children}
      </div>
    </div>
  );
};

/**
 * A card component with an irregular, hand-torn "deckle" edge.
 */
export const DeckleCard = ({ children, className = "", bgColor = "bg-white", elevation = "shadow-md" }) => {
  return (
    <div className={`deckle-edge ${bgColor} ${elevation} p-6 md:p-8 transition-all hover:scale-[1.01] ${className}`}>
      {children}
    </div>
  );
};
