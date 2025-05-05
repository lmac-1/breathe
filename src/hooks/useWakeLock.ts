import { useState, useEffect, useRef, useCallback } from 'react';

interface WakeLockHookReturn {
  isSupported: boolean;
  isActive: boolean;
  request: () => Promise<boolean>;
  release: () => Promise<boolean>;
}

/**
 * A hook that provides Wake Lock functionality to prevent the screen from turning off
 * @returns Wake Lock state and support status
 */
export const useWakeLock = (): WakeLockHookReturn => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Check for Wake Lock support on mount
  useEffect(() => {
    const checkSupport = (): boolean => {
      const isWakeLockSupported =
        'wakeLock' in navigator && 'request' in (navigator as any).wakeLock;

      setIsSupported(isWakeLockSupported);
      return isWakeLockSupported;
    };

    // Check support and request wake lock if supported
    if (checkSupport()) {
      requestWakeLock();
    }
  }, []);

  // Function to request wake lock
  const requestWakeLock = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      wakeLockRef.current = await (navigator as any).wakeLock.request('screen');

      wakeLockRef.current?.addEventListener('release', () => {
        console.log('Wake Lock was released');
        setIsActive(false);
        wakeLockRef.current = null;
      });

      setIsActive(true);
      return true;
    } catch (err) {
      const error = err as Error;
      console.error(`Failed to get Wake Lock: ${error.name}, ${error.message}`);
      return false;
    }
  }, [isSupported]);

  // Function to release wake lock
  const releaseWakeLock = useCallback(async (): Promise<boolean> => {
    if (!wakeLockRef.current) return false;

    try {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      setIsActive(false);
      return true;
    } catch (err) {
      const error = err as Error;
      console.error(
        `Failed to release Wake Lock: ${error.name}, ${error.message}`
      );
      return false;
    }
  }, []);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = async (): Promise<void> => {
      if (document.visibilityState === 'visible' && !wakeLockRef.current) {
        await requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [requestWakeLock]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch((err) => {
          console.error(
            `Error releasing wake lock: ${err.name}, ${err.message}`
          );
        });
      }
    };
  }, []);

  return {
    isSupported,
    isActive,
    request: requestWakeLock,
    release: releaseWakeLock,
  };
};
