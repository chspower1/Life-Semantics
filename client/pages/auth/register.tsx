import Input from "@/components/Input";
import { Col as Form, Wrapper } from "@/styles/Common";
import { SubmitButton, Subtitle, Title } from "@/styles/FormStyle";
import customApi from "@/utils/customApi";
import { useMutation } from "@tanstack/react-query";
import { watch } from "fs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface RegisterForm {
  name: string;
  accountId: string;
  password: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [isConfirmAccountId, setIsConfirmAccountId] = useState(false);
  const { postApi: createUserApi } = customApi<RegisterForm>(`${baseUrl}/auth/register`);
  const { postApi: checkAccountIdApi } = customApi<String>(`${baseUrl}/auth/check-accountId`);
  const { mutate } = useMutation(["register"], createUserApi, {
    onSuccess(data) {
      if (data) {
        alert("회원가입을 축하드립니다!");
        router.push("/auth/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    },
  });
  const { mutateAsync: checkAccountIdMutate } = useMutation(["checkAccountId"], checkAccountIdApi, {
    onSuccess(data) {
      if (data) {
        setIsConfirmAccountId(true);
        alert("사용가능한 아이디 입니다.");
      } else alert("이미 가입된 아이디입니다!");
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterForm>({ mode: "onChange" });

  const onValid = ({ name, accountId, password }: RegisterForm) => {
    console.log({ name, accountId, password });
    if (isConfirmAccountId) {
      mutate({ name, accountId, password });
    } else alert("아이디 중복확인을 해주세요!");
  };
  const handleClickCheckAccountId = () => {
    const accountId = watch("accountId");
    if (accountId === "") {
      alert("아이디를 입력해주세요!");
    } else checkAccountIdMutate(watch("accountId"));
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
        <div style={{ position: "relative" }}>
          <Input
            name="accountId"
            label="아이디"
            register={register("accountId", {
              required: "아이디를 입력해주세요!",
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: "아이디는 6~19글자와 영문,숫자 조합으로 입력해주세요",
              },
              onChange() {
                setIsConfirmAccountId(false);
              },
            })}
            errorMessage={errors.accountId?.message || null}
          />
          <CheckAccountIdButton
            disabled={watch("accountId") === null ? true : false}
            isConfirmAccountId={isConfirmAccountId}
            type="button"
            onClick={handleClickCheckAccountId}
          >
            {isConfirmAccountId ? "확인완료" : "중복확인"}
          </CheckAccountIdButton>
        </div>
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

const CheckAccountIdButton = styled(SubmitButton)<{ isConfirmAccountId: boolean }>`
  position: absolute;
  font-size: 12px;
  width: 60px;
  height: 30px;
  top: 40px;
  right: 10px;
  background-color: ${(props) => (props.isConfirmAccountId ? "gray" : "#d63031")};
`;
