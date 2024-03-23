import { useEffect } from 'react';
import { useUiStore } from '@stores/uiStore.ts';
import { randomInt } from '@/lib/numbers.ts';

export default function TopLoadingBarComponent() {
  const progress = useUiStore((state) => state.topLoadingBarProgress);
  const setProgress = useUiStore((state) => state.setTopLoadingBarProgress);
  useEffect(() => {
    const updateProgress = () => {
      if (progress < 20) {
        setProgress(randomInt(20, 30));
      } else if (progress < 90) {
        setProgress(progress + randomInt(2, 10));
      } else if (progress >= 100) {
        setProgress(0);
      }
    };

    let timer: NodeJS.Timeout | undefined;

    if (progress < 20) {
      updateProgress();
    } else {
      timer = setTimeout(updateProgress, randomInt(500, 1000));
    }

    return () => {
      clearTimeout(timer);
    };
  }, [progress, setProgress]);

  useEffect(() => {
    return () => {
      setProgress(100);
    };
  }, [setProgress]);

  return <></>;
}
