import { css, keyframes, Theme } from '@emotion/react';

export const HeroContainer = css`
  position: relative;
  background-color: #0a0a0a;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
    z-index: 10;
  }
`;

export const BlinkCursorKeyframe = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const WheelScrollKeyframe = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  25% {
    transform: translateY(6px);
    opacity: 1;
  }

  50% {
    transform: translateY(6px);
    opacity: 0;
  }

  100% {
    transform: translateY(6px);
    opacity: 0;
  }
`;

export const HeroTitle = (theme: Theme) => css`
  font-size: 56px;
  font-weight: 700;
  color: ${theme.colors.white};
  line-height: 1.25;
  text-align: center;

  &::after {
    content: '|';
    font-weight: 300;
    animation: ${BlinkCursorKeyframe} 1s linear infinite;
  }

  ${theme.mediaQueries.md} {
    font-size: 42px;
  }

  ${theme.mediaQueries.sm} {
    font-size: 32px;
    word-break: keep-all;
  }
`;

export const Mouse = (theme: Theme) => css`
  position: absolute;
  bottom: 34dvh;
  left: 50%;
  width: 24px;
  height: 36px;
  border: 2px solid ${theme.colors.white};
  border-radius: 12px;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 10;

  .mouse__wheel {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 2px;
    height: 6px;
    margin-left: -1px;
    border-radius: 1px;
    background-color: ${theme.colors.white};
    animation: ${WheelScrollKeyframe} 1s linear infinite;
  }
`;

export const MimoticonImage = (theme: Theme) => css`
  position: absolute;
  bottom: 0;
  left: 50%;
  max-height: 38vh;
  transform: translateX(-50%);
  animation: fadeIn 1s linear;
  z-index: 5;

  ${theme.mediaQueries.md} {
    max-height: 28vh;
  }
`;
