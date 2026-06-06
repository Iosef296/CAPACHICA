import React, { useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export default function StarrySky() {
  const { darkMode } = useTheme();

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      const size =
        Math.random() > 0.85 ? 'lg'
        : Math.random() > 0.5 ? 'md'
        : 'sm';
      arr.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`,
        size,
        delay: `${Math.random() * 5}s`,
        duration: size === 'lg' ? '3s' : size === 'md' ? '4s' : '5s'
      });
    }
    return arr;
  }, []);

  return (
    <>
      {darkMode && (
        <div className="stars-container">
          {stars.map(star => (
            <div
              key={star.id}
              className={`star star-${star.size} animate-twinkle`}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration
              }}
            />
          ))}
        </div>
      )}

      {!darkMode && (
        <div className="sun-container animate-sun-rise">
          <div className="sun-body">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="sun-ray"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}