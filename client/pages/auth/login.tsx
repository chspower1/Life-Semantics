import Input from "@/components/Input";
import { Row, Wrapper } from "@/styles/Common";
import { Button, ErrorMessage, Form, InputBox } from "@/styles/FormStyle";
import customApi from "@/utils/customApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage = () => {
  const { postApi: loginApi } = customApi<LoginForm>("/auth/login");
  const { mutateAsync } = useMutation(["login"], loginApi);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const onValid = async ({ accountId, password }: LoginForm) => {
    const token = await mutateAsync({ accountId, password });
    console.log(token);
    localStorage.setItem("token", token);

    console.log({ accountId, password });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputBox>
          <Input
            name="accountId"
            label="아이디"
            register={register("accountId", {
              required: "아이디를 입력해주세요.",
            })}
            errorMessage={errors.accountId?.message || null}
          />
          <ErrorMessage>{errors?.accountId?.message}</ErrorMessage>
        </InputBox>
        <InputBox>
          <Input
            name="password"
            label="비밀번호"
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            errorMessage={errors.password?.message || null}
          />
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </InputBox>
        <Button>로그인</Button>
        <Link href="/auth/register">회원가입</Link>
      </Form>
    </Wrapper>
  );
};
export default LoginPage;
