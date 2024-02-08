/** @jsxImportSource theme-ui */
import { useEffect, useMemo, useState } from 'react';
import { Flex, Heading, ThemeUICSSObject } from 'theme-ui';

interface RotatingTextProps {
  words: string[];
  /** Delay between rotation of words (in ms) */
  delay?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ words, delay = 1400 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const currWord = useMemo(() => words[wordIndex], [wordIndex, words]);
  const nextWord = useMemo(
    () => words[(wordIndex + 1) % words.length],
    [wordIndex, words]
  );

  const rotateOutAnimation: ThemeUICSSObject = useMemo(() => {
    return {
      '@keyframes rotate-out': {
        '0%': {
          transform: 'translateY(0)',
        },
        '30%': {
          transform: 'translateY(-100%)',
        },
        '100%': {
          transform: 'translateY(-100%)',
        },
      },
      animation: 'rotate-out 1.5s ease-out',
      animationFillMode: 'forwards',
      animationDelay: `${(delay / 1000).toFixed(2)}s`,
    };
  }, [delay]);

  const rotateInAnimation: ThemeUICSSObject = useMemo(() => {
    return {
      '@keyframes rotate-in': {
        '0%': {
          transform: 'translateY(0)',
        },
        '20%': {
          transform: 'translateY(-112%)',
        },
        '45%': {
          transform: 'translateY(-90%)',
        },
        '60%': {
          transform: 'translateY(-100%)',
        },
        '100%': {
          transform: 'translateY(-100%)',
        },
      },
      animation: 'rotate-in 1.5s ease-out',
      animationFillMode: 'forwards',
      animationDelay: `${(delay / 1000).toFixed(2) + 200}s`,
    };
  }, [delay]);

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
    <Flex
      sx={{
        flexDirection: 'column',
        height: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <Heading as='h2' key={currWord} sx={rotateOutAnimation}>
        {currWord}
      </Heading>
      <Heading as='h2' key={nextWord} sx={rotateInAnimation}>
        {nextWord}
      </Heading>
    </Flex>
  );
};

export default RotatingText;
