import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
}
const Input = ({ register, label, name }: InputProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" {...register} />
    </>
  );
};
export default Input;
