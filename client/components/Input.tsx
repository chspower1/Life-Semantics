import { Col } from "@/styles/Common";
import { ErrorMessage, InputBox, InputStyle, Label } from "@/styles/FormStyle";
import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage: string | null;
}
const Input = ({ register, label, name, type = "text", errorMessage }: InputProps) => {
  return (
    <InputBox>
      <Label htmlFor={name}>{label}</Label>
      <InputStyle id={name} type={type} {...register} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputBox>
  );
};
export default Input;
