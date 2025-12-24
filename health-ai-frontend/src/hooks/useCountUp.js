import { useEffect, useState } from "react";

// Ease-out cubic for natural slowdown
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = null;
    let animationFrame;

    function animate(timestamp) {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // 🔥 Apply easing
      const easedProgress = easeOutCubic(progress);

      setValue(Math.round(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}
