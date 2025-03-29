import { css, Theme } from '@emotion/react';

export const ContactContainer = (theme: Theme) => css`
  display: flex;
  height: 480px;
  justify-content: center;
  align-items: center;
  background-image: url(/images/contact_bg.webp);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${theme.mediaQueries.sm} {
    height: 340px;
  }
`;

export const ContactBlock = (theme: Theme) => css`
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 12px;
  background-color: #f1f5f9;

  ul {
    li {
      position: relative;
      padding-left: 28px;
      color: ${theme.colors.typo.tertiary};
      line-height: 1.75;

      .icon {
        position: absolute;
        top: 6px;
        left: 0;
        color: #94a3b8;
      }
    }
  }

  ${theme.mediaQueries.xs} {
    ul {
      li {
        font-size: 14px;

        .icon {
          top: 4px;
        }
      }
    }
  }
`;

export const StyledCheckbox = css`
  .custom__check--box {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background-color: #fff;
    vertical-align: middle;
    appearance: none;
    cursor: pointer;

    &:hover,
    &:focus {
      border-color: #14b8a6;
      box-shadow: 0 0 0 2px rgba(#14b8a6, 20%);
    }

    &:checked {
      border-color: #14b8a6;
      background-color: #14b8a6;

      &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 10px;
        height: 6px;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(-45deg);
      }
    }
  }
`;

export const Spinner = css`
  position: absolute;
  display: flex;
  inset: 0px;
  align-items: center;
  justify-content: center;

  .spinner {
    position: relative;
    width: 100px;
    height: 100px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      transform: translate(-5px, -50%);
      background: linear-gradient(to right, #495057 50%, #14b8a6 50%) no-repeat;
      background-size: 200% auto;
      background-position: 100% 0;
      animation: colorBallMoveX 1.5s linear infinite alternate;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background-color: #14b8a6;
    }
  }

  @keyframes colorBallMoveX {
    0% {
      background-position: 100% 0;
      transform: translate(-15px, -50%);
    }

    15%,
    25% {
      background-position: 100% 0;
      transform: translate(0px, -50%);
    }

    75%,
    85% {
      background-position: 100% 0;
      transform: translate(50px, -50%);
    }

    100% {
      background-position: 100% 0;
      transform: translate(65px, -50%);
    }
  }
`;
