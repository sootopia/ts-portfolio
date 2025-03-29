/** @jsxImportSource @emotion/react */
import ReactDOM from 'react-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect, forwardRef } from 'react';
import * as S from './ContactSection.styles';
import MainHeader from '../header/MainHeader';
import Modal from '../Modal';
import CustomInput from '../CustomInput';
import ErrorText from '../ErrorText';
import emailjs from '@emailjs/browser';
import { alert } from '../../utils/alert';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  agree: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
  agree: string;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactModal = ({ isOpen, onClose, title, children }: ContactModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

const LoadingSpinner = () => {
  return (
    <div css={S.Spinner}>
      <div className="spinner"></div>
    </div>
  );
};

const ContactSection = forwardRef<HTMLElement, unknown>((_, ref) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    agree: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: '',
    agree: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? '성명은 2글자 이상 입력해 주세요.' : '';
      case 'email':
        return !validateEmail(value.trim()) ? '이메일 형식에 맞게 입력해 주세요.' : '';
      case 'message':
        return value.trim().length < 1 ? '문의 내용을 입력해 주세요.' : '';
      case 'agree':
        return !value ? '개인정보 수집 및 이용약관에 동의해 주세요.' : '';
      default:
        return '';
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, fieldValue as string),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      agree: false,
    });

    setErrors({
      name: '',
      email: '',
      message: '',
      agree: '',
    });
  };

  useEffect(() => {
    const formIsValid =
      Object.values(errors).every((x) => x === '') &&
      Object.values(formData).every((x) => x !== '') &&
      formData.agree;
    setIsFormValid(formIsValid);
  }, [formData, errors]);

  const showTerms = async () => {
    await alert({
      title: '개인정보 수집 및 이용',
      message:
        '- 수집 목적 : 문의 내용 확인 및 응답 <br>- 수집 항목 : 이름, 이메일 <br>- 보유 및 이용 기간 : 문의 응답 완료시까지',
      width: 400,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (isFormValid) {
      try {
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          EMAILJS_PUBLIC_KEY,
        );

        if (response.status === 200) {
          await alert({ title: '접수 성공', message: '궁금한 점을 전달했어요.', width: 400 });
          closeModal();
          resetForm();
        } else {
          await alert({ title: '전송 실패', message: '잠시 후 다시 시도해주세요.', width: 400 });
        }
      } catch (error) {
        console.error(error);
        await alert({ title: '오류', message: '오류가 발생했어요.', width: 400 });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section css={S.ContactContainer(theme)} ref={ref}>
      <div className="px-5 text-center">
        <MainHeader animate className="mb-12">
          저에 대해 궁금한 점이 있으신가요?
        </MainHeader>
        <div className="text-center">
          <button
            className="h-12 px-4 sm:px-6 text-white font-semibold rounded-lg bg-teal-500"
            onClick={openModal}
          >
            궁금한 점 문의하기
          </button>
        </div>

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => {
            closeModal();
            resetForm();
          }}
          title="궁금한 점 문의하기"
        >
          <form onSubmit={handleSubmit}>
            {isLoading && <LoadingSpinner />}

            <div css={S.ContactBlock(theme)}>
              <ul>
                <li>
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                    </svg>
                  </div>
                  shpark7502@gmail.com
                </li>
                <li>
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                  </div>
                  <a href="https://github.com/sootopia" target="_blank" rel="noreferrer noopener">
                    https://github.com/sootopia
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-3">
              <CustomInput
                type="text"
                name="name"
                placeholder="성명"
                value={formData.name}
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </div>
            <div className="mb-3">
              <CustomInput
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </div>
            <div className="mb-3">
              <CustomInput
                name="message"
                isTextarea
                placeholder="문의내용"
                value={formData.message}
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}
            </div>
            <div className="mb-12">
              <div className="flex justify-between items-center">
                <div css={S.StyledCheckbox}>
                  <input
                    type="checkbox"
                    name="agree"
                    className="custom__check--box"
                    id="chkAgree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <label htmlFor="chkAgree" className="text-slate-600 align-middle cursor-pointer">
                    개인정보 수집 및 이용 동의
                  </label>
                </div>

                <button
                  type="button"
                  className="text-sm text-teal-500 hover:text-teal-600 font-medium"
                  onClick={showTerms}
                >
                  내용보기
                </button>
              </div>

              {errors.agree && <ErrorText>{errors.agree}</ErrorText>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="h-14 px-6 text-white font-semibold rounded-lg bg-slate-400 enabled:hover:bg-slate-500 cursor-not-allowed enabled:cursor-pointer outline-none transition-[background-color] duration-200"
                onClick={() => {
                  closeModal();
                  resetForm();
                }}
              >
                취소
              </button>
              <button
                type="submit"
                className="h-14 px-6 text-white font-semibold rounded-lg bg-teal-500/40 enabled:bg-teal-500 enabled:hover:bg-teal-600 cursor-not-allowed enabled:cursor-pointer outline-none transition-[background-color] duration-200"
                disabled={!isFormValid}
              >
                문의하기
              </button>
            </div>
          </form>
        </ContactModal>
      </div>
    </section>
  );
});

export default ContactSection;
