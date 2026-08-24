import { useState, useEffect, useCallback, useRef } from 'react';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!<>-_\\/[]{}—=+*^?#';

export function useScrambleText(targetText: string, speed = 30, autoTrigger = true) {
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    let iteration = 0;
    const maxIterations = targetText.length * 3;
    setIsScrambling(true);

    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = window.setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return targetText[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (frameRef.current) clearInterval(frameRef.current);
        setDisplayText(targetText);
        setIsScrambling(false);
      }

      iteration += 1;
    }, speed);
  }, [targetText, speed]);

  useEffect(() => {
    if (autoTrigger) {
      trigger();
    }
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [trigger, autoTrigger]);

  return { displayText, isScrambling, trigger };
}
