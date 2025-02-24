/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useRef, useEffect, forwardRef } from 'react';

interface MainHeaderProps {
  animate?: boolean;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Heading = (theme: Theme) => css`
  position: relative;
  font-size: 48px;
  font-weight: 700;
  color: ${theme.colors.white};
  letter-spacing: -0.01em;
  word-break: keep-all;
  overflow: hidden;

  span {
    display: block;
  }

  &.animate span {
    transform: translateY(100%);
    transition: transform 0.8s cubic-bezier(0.655, 0.755, 0.18, 0.97);
  }

  &.animated span {
    transform: translateY(0);
  }

  &.dark {
    color: #101010;
  }

  @media (max-width: 1279px) {
    font-size: 40px;
  }

  @media (max-width: 1023px) {
    font-size: 34px;
  }

  ${theme.mediaQueries.sm} {
    font-size: 28px;
    line-height: 1.4;
  }
`;

const MainHeader = forwardRef<HTMLHeadingElement, MainHeaderProps>(
  ({ animate = false, dark = false, className = '', children }, ref) => {
    const theme = useTheme();
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
      const currentRef = headingRef.current;

      if (!currentRef || !animate) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      });

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        observer.disconnect();
      };
    }, [animate]);

    const classNames = [className ? className : '', dark ? 'dark' : '', animate ? 'animate' : '']
      .filter(Boolean)
      .join(' ');

    return (
      <h2 ref={ref || headingRef} css={Heading(theme)} className={classNames}>
        <span>{children}</span>
      </h2>
    );
  },
);

export default MainHeader;
