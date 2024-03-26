import { type HTMLAttributes, useEffect, useState } from 'react';
import { randomInt } from '@lib/numbers.ts';
import { Progress } from '@components/ui/progress.tsx';

type FakeProgressProps = HTMLAttributes<HTMLDivElement>;

export default function FakeProgress({ className, ...props }: FakeProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (progress < 15) {
        setProgress(randomInt(15, 20));
      } else if (progress < 95) {
        setProgress(progress + randomInt(1, 2));
      } else if (progress >= 100) {
        /*setProgress(0);*/
      }
    };

    let timer: NodeJS.Timeout | undefined;

    if (progress < 20) {
      updateProgress();
    } else {
      timer = setTimeout(updateProgress, randomInt(100, 300));
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

  return <Progress className={className} value={progress} {...props} />;
}
