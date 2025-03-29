import { ThemeProvider } from '@emotion/react';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { throttle } from 'lodash';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/layouts/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillSection from './components/sections/SkillSection';
import WorksSection from './components/sections/WorksSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layouts/Footer';

gsap.registerPlugin(ScrollTrigger);

interface SectionRefs {
  hero: React.RefObject<HTMLElement | null>;
  about: React.RefObject<HTMLElement | null>;
  skills: React.RefObject<HTMLElement | null>;
  works: React.RefObject<HTMLElement | null>;
  contact: React.RefObject<HTMLElement | null>;
}

const App = () => {
  const sectionRefs = useRef<SectionRefs>({
    hero: React.createRef<HTMLElement | null>(),
    about: React.createRef<HTMLElement | null>(),
    skills: React.createRef<HTMLElement | null>(),
    works: React.createRef<HTMLElement | null>(),
    contact: React.createRef<HTMLElement | null>(),
  });

  const [isSticky, setIsSticky] = useState(false);
  const [isLightHeader, setIsLightHeader] = useState(false);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const hero = sectionRefs.current.hero.current;
        const about = sectionRefs.current.about.current;

        if (hero && about) {
          const stickyPoint = hero.offsetHeight;
          const lightHeaderPoint = stickyPoint + about.offsetHeight;
          const scrollTop = window.scrollY;

          setIsSticky(scrollTop >= stickyPoint);
          setIsLightHeader(scrollTop >= lightHeaderPoint);
        }
      }, 100),
    [],
  );

  const scrollToSection = (section: string) => {
    const element = sectionRefs.current[section as keyof SectionRefs].current;
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header isSticky={isSticky} isLightHeader={isLightHeader} handleClick={scrollToSection} />
        <HeroSection ref={sectionRefs.current.hero} handleClick={scrollToSection} />
        <AboutSection ref={sectionRefs.current.about} />
        <SkillSection ref={sectionRefs.current.skills} />
        <WorksSection ref={sectionRefs.current.works} />
        <ContactSection ref={sectionRefs.current.contact} />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
