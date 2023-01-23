import { Col } from "@/styles/Common";
import { ErrorMessage, InputBox, InputStyle, Label } from "@/styles/FormStyle";
import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage: string | null;
  isReservation?: boolean;
  [key: string]: any;
}
const Input = ({
  register,
  label,
  name,
  type = "text",
  errorMessage,
  isReservation = false,
  ...rest
}: InputProps) => {
  return (
    <InputBox isReservation={isReservation}>
      <Label htmlFor={name}>{label}</Label>
      <InputStyle isReservation={isReservation} id={name} type={type} {...register} {...rest} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputBox>
  );
};
export default Input;
