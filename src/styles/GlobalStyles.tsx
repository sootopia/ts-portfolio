import { Global, css } from '@emotion/react';
import './fonts.css';

const baseStyles = css`
  body {
    font-family: 'Pretendard', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #efefef;
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
    background: none;
    border: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

const GlobalStyles = () => <Global styles={baseStyles} />;

export default GlobalStyles;
