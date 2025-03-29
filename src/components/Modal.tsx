/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper = css`
  position: fixed;
  inset: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(51, 51, 51, 0.75);
  z-index: 1150;
`;

const ModalDialog = css`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 100%;
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 32px;
  padding-bottom: 32px;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    max-width: 500px;
  }

  @media (min-width: 640px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ModalContent = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px;
  border-radius: 24px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 8px 32px 8px rgba(33, 33, 33, 0.08);

  ${theme.mediaQueries.sm} {
    padding: 24px;
  }
`;

const Modal = ({ title, children, onClose }: ModalProps) => {
  const theme = useTheme();
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div css={ModalWrapper} tabIndex={-1} aria-modal="true" role="dialog" onClick={onClose}>
      <div css={ModalDialog}>
        <div css={ModalContent(theme)} onClick={handleContentClick}>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-xl font-bold">{title}</h1>
            <button
              type="button"
              className="text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
