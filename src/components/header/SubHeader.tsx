/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useRef, useEffect, forwardRef } from 'react';

interface SubHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const SubHeadingStyle = (theme: Theme) => css`
  font-size: 24px;
  font-weight: 800;
  color: ${theme.colors.primary};
  margin-bottom: 32px;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 1s ease, filter 1s ease;

  &.animated {
    opacity: 1;
    filter: none;
  }

  ${theme.mediaQueries.sm} {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const SubHeader = forwardRef<HTMLHeadingElement, SubHeaderProps>(
  ({ className = '', children }, ref) => {
    const theme = useTheme();
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
      const currentRef = headingRef.current;

      if (!currentRef) return;

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
    }, []);

    return (
      <h3 ref={ref || headingRef} css={SubHeadingStyle(theme)} className={className}>
        {children}
      </h3>
    );
  },
);

export default SubHeader;
