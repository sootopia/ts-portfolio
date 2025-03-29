import { ThemeProvider } from '@emotion/react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillSection from './components/sections/SkillSection';
import WorksSection from './components/sections/WorksSection';
import ContactSection from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const aboutSectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HeroSection />
        <AboutSection ref={aboutSectionRef} />
        <SkillSection />
        <WorksSection />
        <ContactSection />
      </ThemeProvider>
    </>
  );
};

export default App;
