import Input from "@/components/Input";
import { Col as Form, Wrapper } from "@/styles/Common";
import { SubmitButton, Subtitle, Title } from "@/styles/FormStyle";
import customApi from "@/utils/customApi";
import { useMutation } from "@tanstack/react-query";
import { watch } from "fs";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  accountId: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const { postApi } = customApi<RegisterForm>("http://localhost:8080/auth/register");
  const { mutate } = useMutation(["register"], postApi);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterForm>();

  const onValid = ({ name, accountId, password, confirmPassword }: RegisterForm) => {
    console.log({ name, accountId, password });
    mutate({ name, accountId, password, confirmPassword });
  };
  return (
    <Wrapper>
      <Form as="form" onSubmit={handleSubmit(onValid)}>
        <Title>회원가입</Title>
        <Input
          name="name"
          label="이름"
          register={register("name", {
            required: "이름을 입력해주세요!",
            minLength: {
              value: 2,
              message: "이름은 두 글자 이상 입력해주세요!",
            },
          })}
          errorMessage={errors.name?.message || null}
        />
        <Input
          name="accountId"
          label="아이디"
          register={register("accountId", {
            required: "아이디를 입력해주세요!",
            pattern: {
              value: /^[a-z]+[a-z0-9]{5,19}$/g,
              message: "아이디는 6~19글자와 영문,숫자 조합으로 입력해주세요",
            },
          })}
          errorMessage={errors.accountId?.message || null}
        />
        <Input
          type="password"
          name="password"
          label="비밀번호"
          register={register("password", {
            required: "비밀번호를 입력해주세요!",
            pattern: {
              value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
              message: "비밀번호는 8~16자 영문,숫자,특수문자를 최소 1가지 이상 포함시켜주세요.",
            },
          })}
          errorMessage={errors.password?.message || null}
        />
        <Input
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          register={register("confirmPassword", {
            required: "비밀번호를 다시한번 입력해주세요!",
            validate: (value) => value === watch("password") || "비밀번호가 일치하지 않아요!",
          })}
          errorMessage={errors.confirmPassword?.message || null}
        />
        <SubmitButton>회원가입</SubmitButton>
      </Form>
      <Link href="/auth/login">
        <Subtitle>라이프시멘틱스 회원이신가요?</Subtitle>
      </Link>
    </Wrapper>
  );
};
export default RegisterPage;
