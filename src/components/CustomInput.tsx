interface CustomInputProps {
  name: string;
  value: string;
  type?: string;
  isTextarea?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomInput = ({
  name,
  value,
  type = 'text',
  isTextarea = false,
  placeholder,
  onChange,
}: CustomInputProps) => {
  return !isTextarea ? (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      className="block w-full h-[54px] px-4 font-medium text-gray-600 placeholder:text-gray-300 border border-gray-200 rounded-xl bg-white outline-none focus:border-teal-600 focus:shadow-[0px_0px_0px_2px_rgba(13,148,136,0.2)]"
      placeholder={placeholder}
      onChange={onChange}
    />
  ) : (
    <textarea
      id={name}
      name={name}
      value={value}
      className="block w-full px-4 py-3 font-medium text-gray-600 placeholder:text-gray-300 border border-gray-200 rounded-xl resize-none bg-white outline-none focus:border-teal-600 focus:shadow-[0px_0px_0px_2px_rgba(13,148,136,0.2)]"
      placeholder={placeholder}
      style={{ height: '130px' }}
      onChange={onChange}
    />
  );
};

export default CustomInput;
