/** @jsxImportSource theme-ui */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './rotatingText.css';
import { Heading, ThemeUIStyleObject } from 'theme-ui';

interface RotatingTextProps {
  words: string[];
  /** Delay between rotation of words (in ms) */
  delay?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ words, delay = 2200 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const currWord = useMemo(() => words[wordIndex], [wordIndex, words]);
  const nextWord = useMemo(
    () => words[(wordIndex + 1) % words.length],
    [wordIndex, words]
  );

  const rotateInAnimation: ThemeUIStyleObject = {
    animation: 'rotate-in 1.2s ease-out',
    animationFillMode: 'forwards',
    animationDelay: `${(delay / 1000).toFixed(2)}s`,
  };
  const rotateOutAnimation: ThemeUIStyleObject = {
    animation: 'rotate-out 1.2s ease-out',
    animationFillMode: 'forwards',
    animationDelay: `${(delay / 1000).toFixed(2)}s`,
  };

  useEffect(() => {
    // delay by specified plus time it takes to complete animation
    const timeout = setTimeout(() => {
      console.log('timeout triggered');
      // update word index
      setWordIndex((index) => (index + 1 < words.length ? index + 1 : 0));
    }, delay + 1200);

    // clean up timeouts on dismount
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay, wordIndex, words]);

  return (
    <div className='rotate-container'>
      <Heading as='h3' key={currWord} sx={rotateOutAnimation}>
        {currWord}
      </Heading>
      <Heading as={'h3'} key={nextWord} sx={rotateInAnimation}>
        {nextWord}
      </Heading>
    </div>
  );
};

export default RotatingText;
