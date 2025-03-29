import { Global, css } from '@emotion/react';
import './fonts.css';

const baseStyles = css`
  body {
    font-family: 'Pretendard', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  button {
    cursor: pointer;
  }
`;

const GlobalStyles = () => <Global styles={baseStyles} />;

export default GlobalStyles;
