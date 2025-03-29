import { createRoot } from 'react-dom/client';
import CustomAlert from '../components/CustomAlert';

interface AlertProps {
  title: string;
  message: string;
  width?: number;
}

export const alert = ({ title, message, width = 300 }: AlertProps) => {
  return new Promise<void>((resolve) => {
    const alertContainer = document.createElement('div');
    document.body.appendChild(alertContainer);
    const root = createRoot(alertContainer);

    const closeAlert = () => {
      root.unmount();
      document.body.removeChild(alertContainer);
      resolve();
    };

    root.render(<CustomAlert title={title} message={message} width={width} onClose={closeAlert} />);
  });
};
