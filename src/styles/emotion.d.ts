import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      black: string;
      white: string;
      primary: string;
      typo: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
      };
    };
    gradients: {
      primary: string;
    };
    breakpoints: typeof breakpoints;
    mediaQueries: typeof mediaQueries;
  }
}
