import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

export const Logo = styled.div<{ theme: Theme }>`
  position: relative;
  z-index: 20;

  > a {
    display: inline-flex;
    position: relative;
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    padding: 0 10px;
    height: 46px;
    border: 3px solid #fff;
    align-items: center;
    justify-content: center;
    z-index: 5;
    overflow: hidden;
    transition: color 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background-color: #fff;
      transform: translateX(-115%) skewX(-50deg);
      transition: transform 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: #000;

      &::before {
        transform: translateX(0) skewX(0deg);
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    > a {
      font-size: 16px;
      height: 40px;
    }
  }
`;

export const HamburgerButton = styled.button`
  position: relative;
  margin-right: -18px;
  z-index: 20;
  outline: none;

  svg {
    transition: transform 0.4s;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Navbar = styled.nav<{ theme: Theme }>`
  > ul {
    font-size: 0;

    > li {
      display: inline-block;

      & + li {
        margin-left: 8px;
      }

      > a {
        display: inline-flex;
        height: 40px;
        font-size: 15px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        padding: 0 16px;
        border-radius: 8px;
        align-items: center;
        justify-content: between;

        &:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.08);
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`;

export const NavbarMobile = styled.nav<{ theme: Theme }>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;

  ul {
    width: 100%;

    > li {
      text-align: center;
      padding: 12px 24px;

      > a {
        font-size: 28px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.typo.primary};
      }
    }
  }
`;

export const Wrapper = styled.header<{ theme: Theme }>`
  position: fixed;
  inset: 0;
  height: 70px;
  border-bottom: 1px solid transparent;
  transition: height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease,
    backdrop-filter 0.3s ease;
  z-index: 990;

  &.header--sticky {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);

    &.sticky--light {
      border-color: rgba(33, 37, 41, 0.08);
      background-color: rgba(255, 255, 255, 0.6);

      ${Logo} {
        > a {
          color: ${({ theme }) => theme.colors.black};
          border-color: ${({ theme }) => theme.colors.black};

          &::before {
            background-color: ${({ theme }) => theme.colors.black};
          }

          &:hover {
            color: ${({ theme }) => theme.colors.white};
          }
        }
      }

      ${Navbar} {
        > ul {
          > li {
            > a {
              color: #4d4d4d;

              &:hover {
                color: ${({ theme }) => theme.colors.black};
                background-color: rgba(0, 0, 0, 0.05);
              }
            }
          }
        }
      }

      ${HamburgerButton} {
        .hamburger__line {
          stroke: ${({ theme }) => theme.colors.black};
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 60px;

    ${HamburgerButton} {
      .hamburger__line {
        fill: none;
        transition: stroke 0.8s, stroke-dasharray 0.4s, stroke-dashoffset 0.4s;
        stroke: ${({ theme }) => theme.colors.white};
        stroke-width: 3;
        stroke-linecap: round;

        &--top {
          stroke-dasharray: 40 160;
        }

        &--middle {
          stroke-dasharray: 40 142;
          transform-origin: 50%;
          transition: stroke 0.8s, transform 0.4s;
        }

        &--bottom {
          stroke-dasharray: 40 85;
          transform-origin: 50%;
          transition: stroke 0.8s, transform 0.4s, stroke-dashoffset 0.4s;
        }
      }
    }

    &.navbar--open {
      ${Logo} {
        > a {
          color: ${({ theme }) => theme.colors.black};
          border-color: ${({ theme }) => theme.colors.black};

          &::before {
            background-color: ${({ theme }) => theme.colors.black};
          }

          &:hover {
            color: ${({ theme }) => theme.colors.white};
          }
        }
      }

      ${HamburgerButton} {
        svg {
          transform: rotate(45deg);
        }

        .hamburger__line {
          stroke: ${({ theme }) => theme.colors.black};

          &--top {
            stroke-dashoffset: -64px;
          }

          &--middle {
            transform: rotate(90deg);
          }

          &--bottom {
            stroke-dashoffset: -64px;
          }
        }
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: space-between;
  align-items: center;
`;
