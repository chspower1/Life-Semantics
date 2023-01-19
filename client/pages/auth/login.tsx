import Input from "@/components/Input";
import { Button, Form } from "@/styles/FormStyle";
import customApi from "@/utils/customApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginForm {
  accountId: string;
  password: string;
  asd: string;
}

const LoginPage = () => {
  const { postApi: loginApi } = customApi("/auth/login");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const onValid = async ({ accountId, password }: LoginForm) => {
    const token = await loginApi({ accountId, password });
    console.log(token);
    localStorage.setItem("token", token);

    console.log({ accountId, password });
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input name="accountId" label="아이디" register={register("accountId")} />
      <Input name="password" label="비밀번호" register={register("password")} />
      <Button>로그인</Button>
      <Link href="/auth/register">회원가입</Link>
    </Form>
  );
};
export default LoginPage;
