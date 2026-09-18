/**
 * SpotlightCard — React Bits (JS-CSS variant)
 * Source: https://github.com/DavidHDev/react-bits
 * License: MIT + Commons Clause
 * Adapted: inline styles instead of separate CSS import, colors adjusted for FinSakhi palette.
 */
import { useRef } from 'react';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(26, 122, 94, 0.12)',
}) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
