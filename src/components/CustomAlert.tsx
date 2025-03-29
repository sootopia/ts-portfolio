/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface CustomAlertProps {
  title: string;
  message: string;
  width?: number;
  onClose: () => void;
}

const AlertWrapper = css`
  position: fixed;
  inset: 0;
  background-color: rgba(51, 51, 51, 0.75);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1200;
`;

const AlertContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 32px;
  padding-bottom: 32px;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 639px) {
    max-width: 90%;
  }
`;

const AlertDialog = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 8px 32px 8px rgba(33, 33, 33, 0.08);
`;

const CustomAlert = ({ title, message, width = 300, onClose }: CustomAlertProps) => {
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div css={AlertWrapper} onClick={onClose}>
      <div css={AlertContainer}>
        <div css={AlertDialog} style={{ maxWidth: `${width}px` }} onClick={handleStopPropagation}>
          <h1 className="text-xl font-bold">{title}</h1>
          {message && (
            <p
              className="font-semibold text-slate-600 leading-6 mt-4"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          <div className="text-right mt-8">
            <button
              type="button"
              className="px-4 py-3 text-teal-600 font-semibold rounded-lg outline-none hover:bg-slate-50"
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
