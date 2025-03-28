/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Project } from '../types/project';

interface WorksCardProps {
  data: Project;
}

const Card = (theme: Theme) => css`
  border-radius: 32px;
  background-color: ${theme.colors.white};
  box-shadow: 0 16px 52px -8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const CardHeader = (theme: Theme) => css`
  position: relative;
  aspect-ratio: 1 / 0.75;
  overflow: hidden;

  &.clickable--active {
    .clickable__img {
      transform: scale(1.22);
      filter: blur(26px);

      &::after {
        content: '';
        position: absolute;
        inset: 0px;
        background-color: rgba(255, 255, 255, 0.6);
      }
    }

    .clickable__content {
      pointer-events: all;

      p {
        opacity: 1;
        transform: translateY(0px);
      }

      .close {
        opacity: 1;
      }
    }
  }

  &:not(.clickable--active):hover {
    .clickable__overlay {
      opacity: 1;
    }
  }

  .clickable {
    &__img,
    &__content,
    &__overlay {
      position: absolute;
      inset: 0px;
    }

    &__img {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      z-index: 10;
    }

    &__content {
      padding: 32px;
      word-break: keep-all;
      z-index: 30;
      pointer-events: none;

      p {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .close {
        position: absolute;
        bottom: 24px;
        left: 24px;
        opacity: 0;
        z-index: 10;
        transition: opacity 0.3s ease;
      }
    }

    &__overlay {
      display: flex;
      position: absolute;
      color: ${theme.colors.white};
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      align-items: center;
      justify-content: center;
      opacity: 0;
      z-index: 15;
      transition: opacity 0.3s ease;
    }
  }

  @media (max-width: 1279px) {
    .clickable {
      &__content {
        padding: 24px;
      }
    }
  }
`;

const CardBody = (theme: Theme) => css`
  padding: 32px;

  ${theme.mediaQueries.sm} {
    padding: 24px;
  }
`;

const StackList = (theme: Theme) => css`
  position: absolute;
  display: flex;
  bottom: 20px;
  left: 20px;
  column-gap: 10px;
  z-index: 20;

  .stack__item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.white};
    height: 30px;
    padding: 0 12px;
    justify-content: center;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
  }

  @media (max-width: 1279px) {
    column-gap: 6px;

    .stack__item {
      font-size: 12px;
      height: 26px;
      padding: 0 10px;
    }
  }
`;

const ProgressWrapper = (theme: Theme) => css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;

  h5 {
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.typo.secondary};
  }

  ${theme.mediaQueries.xs} {
    h5 {
      font-size: 12px;
    }
  }
`;

const ProgressContainer = (theme: Theme) => css`
  display: flex;
  align-items: center;
  width: 69.1%;
  column-gap: 12px;
  flex-wrap: wrap;

  span {
    font-size: 14px;
    font-weight: 700;
    color: transparent;
    background-clip: text;
    background-image: ${theme.gradients.primary};
  }

  @media (min-width: 640px) and (max-width: 1279px) {
    width: calc(100% - 110px);
  }

  ${theme.mediaQueries.xs} {
    width: calc(100% - 100px);

    span {
      font-size: 12px;
    }
  }
`;

const ProgressBar = (theme: Theme) => css`
  height: 6px;
  flex: 1 0 0%;
  background-color: #e2e8f0;
  border-radius: 8px;
  overflow: hidden;

  > div {
    height: 100%;
    background-image: ${theme.gradients.primary};
    border-radius: 8px;
  }
`;

const WorksCard = ({ data }: WorksCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [techStack, setTechStack] = useState<string[]>([]);
  const theme = useTheme();
  const toggleDetail = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const stack = data.techStack.split(',');
    setTechStack(stack);
  }, [data]);

  return (
    <div css={Card(theme)}>
      <figure css={CardHeader(theme)} className={isActive ? 'clickable--active' : ''}>
        <div
          className="clickable__img"
          style={{
            backgroundImage: `url(${data.imageUrl ? data.imageUrl : '/images/no_img.png'})`,
          }}
        ></div>
        <div className="clickable__content text-slate-500">
          <p
            className="text-sm xl:text-lg font-medium text-slate-700 leading-6 xl:leading-7 z-10"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          ></p>
          <button type="button" className="close" onClick={toggleDetail}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <div className="clickable__overlay" role="button" onClick={toggleDetail}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </div>
        {!isActive && (
          <div css={StackList(theme)}>
            {techStack.map((stack: string) => (
              <span className="stack__item" key={stack}>
                {stack}
              </span>
            ))}
          </div>
        )}
      </figure>
      <div css={CardBody(theme)}>
        <div css={ProgressWrapper(theme)}>
          <h5>프로젝트 참여율</h5>
          <div css={ProgressContainer(theme)}>
            <div css={ProgressBar(theme)}>
              <div style={{ width: `${data.participationRate}%` }} />
            </div>
            <span>{data.participationRate}%</span>
          </div>
        </div>
        <h4 className="text-xl lg:text-2xl text-gray-800 font-bold leading-[1.35] mb-6 lg:mb-8 break-keep">
          {data.title}
          {data.link && (
            <a
              href={data.link}
              className="ml-1 hover:text-slate-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-link-45deg !inline"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
            </a>
          )}
        </h4>
        <p className="text-sm lg:text-base font-medium text-slate-400">
          {data.client} <small className="text-sm font-normal text-slate-200 mx-1">|</small>{' '}
          {data.period}
        </p>
      </div>
    </div>
  );
};

export default WorksCard;
