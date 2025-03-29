import { css, Theme } from '@emotion/react';

export const WorksContainer = (theme: Theme) => css`
  padding-top: 120px;
  padding-bottom: 120px;

  ${theme.mediaQueries.sm} {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

export const HeaderContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DropdownContainer = css`
  position: relative;
  z-index: 20;
`;

export const DropdownButton = (theme: Theme) => css`
  display: flex;
  width: 148px;
  height: 48px;
  font-weight: 500;
  color: ${theme.colors.typo.tertiary};
  padding: 0 18px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f9fafb;
  }

  &.active {
    color: ${theme.colors.typo.secondary};
    border-color: #4b5563;
    box-shadow: inset 0 0 0 1px #4b5563;
  }
`;

export const Dropdown = (theme: Theme) => css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  z-index: 10;

  ul {
    padding: 12px 8px;

    li {
      a {
        display: flex;
        font-size: 15px;
        font-weight: 500;
        color: ${theme.colors.typo.tertiary};
        height: 40px;
        padding: 0 12px;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background-color: #f9fafb;
        }

        &.active {
          font-weight: 700;
          color: ${theme.colors.primary};
        }
      }
    }
  }
`;
