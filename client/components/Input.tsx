import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
}
const Input = ({ register, label, name, type = "text" }: InputProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register} />
    </>
  );
};
export default Input;
