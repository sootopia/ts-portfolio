import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import HeroSection from './components/sections/HeroSection';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HeroSection />
      </ThemeProvider>
    </>
  );
};

export default App;
