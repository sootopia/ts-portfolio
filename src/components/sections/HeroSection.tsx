/** @jsxImportSource @emotion/react */
import { JSX } from 'react';
import * as S from './HeroSection.styles';
import { useTheme } from '@emotion/react';
import { useState, useEffect, forwardRef } from 'react';

const TypingText = (): JSX.Element => {
  const greeting: string = `안녕하세요. \n프론트엔드 개발자 박수현입니다 :)`;
  const [displayText, setDisplayText] = useState<Array<string | JSX.Element>>([]);
  const [typingIndex, setTypingIndex] = useState<number>(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (typingIndex < greeting.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => {
          if (greeting[typingIndex] === '\n') {
            return [...prev, <br key={typingIndex} />];
          } else {
            return [...prev, greeting[typingIndex]];
          }
        });
        setTypingIndex((prev) => prev + 1);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setDisplayText([]);
        setTypingIndex(0);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [greeting, typingIndex]);

  return <h1 css={S.HeroTitle}>{displayText}</h1>;
};

const HeroSection = forwardRef<HTMLElement, unknown>((_, ref) => {
  const theme = useTheme();

  return (
    <section
      ref={ref}
      css={S.HeroContainer}
      className="flex h-dvh justify-center items-center px-6"
    >
      <TypingText />
      <button css={S.Mouse(theme)}>
        <span className="mouse__wheel"></span>
      </button>
      <img css={S.MimoticonImage} src="/images/hero_mimoticon.png" alt="mimoticon" />
    </section>
  );
});

export default HeroSection;
