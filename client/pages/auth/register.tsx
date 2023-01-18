import Input from "@/components/Input";
import { Button, Form } from "@/styles/FormStyle";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  accountId: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterForm>();
  const onValid = (RegisterForm: RegisterForm) => {
    console.log(RegisterForm);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input name="name" label="이름" register={register("name")} />
      <Input name="accountId" label="아이디" register={register("accountId")} />
      <Input name="password" label="비밀번호" register={register("password")} />
      <Input name="confirmPassword" label="비밀번호 확인" register={register("confirmPassword")} />
      <Button>회원가입</Button>
      <Link href="/auth/login">로그인</Link>
    </Form>
  );
};
export default RegisterPage;
