import { Theme } from '@emotion/react';

export const breakpoints = {
  xs: '479px',
  sm: '767px',
  md: '1023px',
  lg: '1280px',
  xl: '1400px',
} as const;

export const mediaQueries = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
} as const;

export const theme: Theme = {
  colors: {
    black: '#000',
    white: '#fff',
    primary: '#14b8a6',
    typo: {
      primary: '#1f2937',
      secondary: '#374151',
      tertiary: '#6b7280',
      quaternary: '#94a3b8',
    },
  },
  gradients: {
    primary: 'linear-gradient(90deg, #34d399 0%, #14b8a6 100%)',
  },
  breakpoints,
  mediaQueries,
};
