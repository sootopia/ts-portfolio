const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm font-semibold text-red-500 mt-2">{children}</p>;
};

export default ErrorText;
