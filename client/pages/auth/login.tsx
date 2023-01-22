import Input from "@/components/Input";
import { Col as Form, Wrapper } from "@/styles/Common";
import { Button, ErrorMessage, InputBox, Subtitle, Title } from "@/styles/FormStyle";
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
      <Form as="form" onSubmit={handleSubmit(onValid)}>
        <Title>로그인</Title>

        <Input
          name="accountId"
          label="아이디"
          register={register("accountId", {
            required: "아이디를 입력해주세요.",
          })}
          errorMessage={errors.accountId?.message || null}
        />

        <Input
          type="password"
          name="password"
          label="비밀번호"
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          errorMessage={errors.password?.message || null}
        />

        <Button>로그인</Button>
      </Form>
      <Link href="/auth/register">
        <Subtitle>아직 회원이 아니신가요?</Subtitle>
      </Link>
    </Wrapper>
  );
};
export default LoginPage;
