import { css, Theme } from '@emotion/react';

export const SkillContainer = (theme: Theme) => css`
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;

  ${theme.mediaQueries.sm} {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

export const ToggleButton = (theme: Theme) => css`
  display: none;

  ${theme.mediaQueries.xs} {
    display: flex;
    position: absolute;
    top: 34px;
    right: 0;
    height: 28px;
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.white};
    padding: 0 10px;
    gap: 6px;
    border-radius: 16px;
    background-color: #4b5563;
    align-items: center;
    z-index: 5;
  }
`;

export const Tags = (theme: Theme) => css`
  position: relative;
  display: flex;
  font-size: 0;
  margin-bottom: 64px;
  gap: 10px;
  flex-wrap: wrap;

  .tag__item {
    display: inline-flex;
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.typo.tertiary};
    white-space: nowrap;
    height: 34px;
    padding: 0 16px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #f1f3f5;
  }

  ${theme.mediaQueries.sm} {
    margin-bottom: 48px;
    gap: 6px;

    .tag__item {
      font-size: 13px;
      height: 28px;
      padding: 0 8px;
    }
  }

  ${theme.mediaQueries.xs} {
    &:not(.active) {
      height: 62px;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 34px;
        right: 0;
        width: 200px;
        height: 28px;
        background-image: linear-gradient(to left, #fff 50%, transparent 100%);
        z-index: 1;
      }
    }

    &.active {
      button {
        top: auto;
        bottom: 0;
      }
    }
  }
`;

export const GridWrapper = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  ${theme.mediaQueries.xs} {
    grid-template-columns: auto;
  }
`;
