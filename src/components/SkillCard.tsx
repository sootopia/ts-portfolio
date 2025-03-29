/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';

interface SkillCardProps {
  index: number;
  icon: string;
  title: string;
  description: string;
}

const SkillCardStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  padding: 32px;
  row-gap: 48px;
  border: 1px solid #dee2e6;
  border-radius: 32px;
  background-color: ${theme.colors.white};

  .icon {
    display: flex;
    height: 64px;
    align-items: center;
  }

  @media (max-width: 1279px) {
    padding: 24px;
  }

  ${theme.mediaQueries.sm} {
    row-gap: 32px;

    .icon {
      height: 48px;

      img {
        width: 48px;
      }
    }
  }
`;

const SkillCard = ({ index, icon, title, description }: SkillCardProps) => {
  const theme = useTheme();
  const renderIndex = String(index + 1).padStart(2, '0');

  return (
    <div css={SkillCardStyle(theme)}>
      <div className="icon">
        <img width="64" src={icon} alt={title} loading="lazy" />
      </div>
      <div className="content">
        <div className="content__header">
          <span className="block md:text-lg font-semibold text-gray-500 mb-2">{renderIndex}</span>
          <h5 className="text-xl xl:text-2xl text-gray-800 font-bold mb-4">{title}</h5>
          <p
            className="font-semibold text-gray-700 leading-[1.875]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
