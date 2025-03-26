/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useRef, forwardRef } from 'react';

interface AboutCardProps {
  title?: string;
  content?: string;
  description?: string;
  className?: string;
}

const AboutCardStyle = (theme: Theme) => css`
  display: flex;
  width: 47%;
  margin-top: 100px;
  min-height: 300px;
  padding: 40px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 32px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);

  &:first-of-type {
    margin-top: 0;
  }

  &:nth-of-type(2) {
    margin-top: 240px;
  }

  &:nth-of-type(odd):not(:first-of-type) {
    margin-top: -100px;
  }

  @media (max-width: 1279px) {
    padding: 32px;

    &:nth-type-of(2) {
      margin-top: 160px;
    }

    &:nth-type-of(odd):not(:first-type-of) {
      margin-top: -60px;
    }
  }

  ${theme.mediaQueries.sm} {
    margin-top: 60px;

    &:nth-type-of(2) {
      margin-top: 100px;
    }
  }

  ${theme.mediaQueries.xs} {
    width: 100%;
    margin-top: 30px !important;
  }
`;

const AboutCard = forwardRef<HTMLDivElement, AboutCardProps>(
  ({ title = '', content = '', description = '', className = '' }, ref) => {
    const theme = useTheme();
    const cardRef = useRef<HTMLDivElement | null>(null);

    return (
      <div ref={ref || cardRef} css={AboutCardStyle(theme)} className={className ?? ''}>
        <div>
          <span className="block sm:text-lg text-white/60 font-semibold mb-3 sm:mb-2">{title}</span>
          <h4 className="text-[24px] lg:text-[26px] xl:text-[32px] text-[#1b365d] font-bold">
            {content}
          </h4>
        </div>
        <p
          className="text-white font-semibold leading-[1.875] break-keep"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  },
);

export default AboutCard;
