import { css, Theme } from '@emotion/react';

export const AboutContainer = (theme: Theme) => css`
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;
  background-image: url(/images/about_bg.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${theme.mediaQueries.sm} {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

export const AboutGrid = (theme: Theme) => css`
  position: relative;

  .grid__header {
    margin-bottom: 80px;
  }

  .grid__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;

    .grid__header {
      flex: 0 0 34.85%;
      max-width: 34.85%;
    }

    .grid__content {
      flex: 0 0 57.14%;
      max-width: 57.14%;
    }
  }

  ${theme.mediaQueries.xs} {
    .grid__header {
      margin-bottom: 34px;
    }
  }
`;
