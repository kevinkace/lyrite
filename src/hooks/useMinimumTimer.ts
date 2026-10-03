import { useState, useEffect } from 'react';

export function useMinimumTimer(shouldShow, minTimeMs = 1000) {
  const [isVisible, setIsVisible] = useState(shouldShow);
  const [mountTime, setMountTime] = useState(null);

  useEffect(() => {
    if (shouldShow) {
      setIsVisible(true);
      setMountTime(Date.now());
    } else if (mountTime) {
      const elapsed = Date.now() - mountTime;
      const remainingTime = Math.max(0, minTimeMs - elapsed);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [shouldShow, mountTime, minTimeMs]);

  return isVisible;
}
