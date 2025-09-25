import React, { useState, useEffect } from 'react';

const ScreenSizeIndicator = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakpoint(window.innerWidth)
  });

  function getBreakpoint(width) {
    if (width < 501) return 'sm';
    if (width < 1001) return 'md';
    return 'lg';
  }

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs p-1 z-50 font-mono">
      W: {dimensions.width}px H: {dimensions.height}px | {dimensions.breakpoint}
      {/* Breakpoints: SM: <768px, MD: 768-1023px, LG: 1024px+ */}
    </div>
  );
};

export default ScreenSizeIndicator;
