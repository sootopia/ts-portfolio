/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import {
  Logo,
  HamburgerButton,
  NavbarMobile,
  Navbar,
  HeaderContainer,
  Wrapper,
} from './Header.styles';
import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavbarProps {
  menu: { name: string; section: string }[];
  handleClick: (section: string) => void;
  setIsNavbarOpen: (isNavbarOpen: boolean) => void;
}

interface HeaderProps {
  isSticky?: boolean;
  isLightHeader?: boolean;
  handleClick: (section: string) => void;
}

interface MenuListProps {
  name: string;
  section: string;
}

const MobileNavbar = forwardRef<HTMLDivElement, MobileNavbarProps>(
  ({ menu, handleClick, setIsNavbarOpen, ...props }, ref) => {
    const theme = useTheme();

    return (
      <NavbarMobile theme={theme} ref={ref} {...props}>
        <ul>
          {menu.map((menu: MenuListProps) => (
            <li key={menu.name}>
              <a
                href="#none"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(`${menu.section}`);
                  setIsNavbarOpen(false);
                }}
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </NavbarMobile>
    );
  },
);

const MotionMobileNavbar = motion.create(MobileNavbar);
MobileNavbar.displayName = 'MobileNavbar';

const Header = ({ isSticky = false, isLightHeader = false, handleClick }: HeaderProps) => {
  const theme = useTheme();
  const menuList: MenuListProps[] = [
    {
      name: 'Intro',
      section: 'hero',
    },
    {
      name: 'About',
      section: 'about',
    },
    {
      name: 'Skills',
      section: 'skills',
    },
    {
      name: 'Projects',
      section: 'works',
    },
    {
      name: 'Contact',
      section: 'contact',
    },
  ];
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const classNames = [
    isSticky ? 'header--sticky' : '',
    isLightHeader ? 'sticky--light' : '',
    isNavbarOpen ? 'navbar--open' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const navbarVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        opacity: {
          type: 'tween',
          duration: 0.35,
          ease: [0.445, 0.05, 0.55, 0.95],
        },
        y: {
          type: 'tween',
          duration: 0.6,
          ease: [0.645, 0.045, 0.355, 1],
        },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: {
          type: 'tween',
          duration: 0.35,
          ease: [0.445, 0.05, 0.55, 0.95],
        },
        y: {
          type: 'tween',
          duration: 0.6,
          ease: [0.645, 0.045, 0.355, 1],
        },
      },
    },
  };

  useEffect(() => {
    document.body.style.overflowY = isNavbarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [isNavbarOpen]);

  return (
    <Wrapper theme={theme} className={classNames}>
      <HeaderContainer>
        <Logo theme={theme}>
          <a href="/">PARKSOOHYUN.</a>
        </Logo>
        <Navbar theme={theme}>
          <ul>
            {menuList.map((menu: MenuListProps) => (
              <li key={menu.name}>
                <a
                  href="#none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(`${menu.section}`);
                  }}
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </Navbar>

        <HamburgerButton onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
          <svg viewBox="0 0 100 100" width="48">
            <path
              className="hamburger__line hamburger__line--top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="hamburger__line hamburger__line--middle" d="m 30,50 h 40" />
            <path
              className="hamburger__line hamburger__line--bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </svg>
        </HamburgerButton>

        <AnimatePresence>
          {isNavbarOpen && (
            <MotionMobileNavbar
              initial="closed"
              animate="open"
              exit="closed"
              variants={navbarVariants}
              menu={menuList}
              handleClick={handleClick}
              setIsNavbarOpen={setIsNavbarOpen}
            />
          )}
        </AnimatePresence>
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;
