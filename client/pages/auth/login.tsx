import { userAtom } from "@/atom";
import Input from "@/components/Input";
import { baseUrl } from "@/constant/baseUrl";
import { Col as Form, Wrapper } from "@/styles/Common";
import { ErrorMessage, InputBox, SubmitButton, Subtitle, Title } from "@/styles/FormStyle";
import customApi from "@/utils/customApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
interface LoginForm {
  accountId: string;
  password: string;
}
interface ResponseLogin {
  user: {
    id: number;
    accountId: string;
    name: string;
  };
  token: string;
}
const LoginPage = () => {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const { postApi: loginApi } = customApi<LoginForm>(`${baseUrl}/auth/login`);
  const { mutate: loginMutate } = useMutation<ResponseLogin, AxiosError, LoginForm>(
    ["login"],
    loginApi,
    {
      onSuccess(data) {
        if (data) {
          setUser(data.user);
          localStorage.setItem("token", data.token);
          router.push("/hospital");
        } else alert("사용자 정보가 옳지 않습니다!");
      },
    }
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const onValid = async ({ accountId, password }: LoginForm) => {
    loginMutate({ accountId, password });
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

        <SubmitButton>로그인</SubmitButton>
      </Form>
      <Link href="/auth/register">
        <Subtitle>아직 회원이 아니신가요?</Subtitle>
      </Link>
    </Wrapper>
  );
};
export default LoginPage;
