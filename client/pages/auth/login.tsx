import Input from "@/components/Input";
import { Form } from "@/styles/FormStyle";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const onValid = (loginForm: LoginForm) => {
    console.log(loginForm);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input name="accountId" label="아이디" register={register("accountId")} />
      <Input name="password" label="비밀번호" register={register("password")} />
      <button>로그인</button>
      <Link href="/auth/register">회원가입</Link>
    </Form>
  );
};
export default LoginPage;