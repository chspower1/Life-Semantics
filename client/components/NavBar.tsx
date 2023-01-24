import { userAtom } from "@/atom";
import { FlexBox } from "@/styles/Common";
import { SubmitButton } from "@/styles/FormStyle";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const NavBar = () => {
  const { pathname, push } = useRouter();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    if (user) setIsLogin(true);
    else setIsLogin(false);
  }, [user]);

  const handleClickLogoutButton = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      setUser(null);
      push("/");
    }
  };
  return (
    <NavBarWrapper>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={268} height={38} />
      </Link>
      <Menu>
        <Link href="/hospital" style={{ color: pathname === "/hospital" ? "#d63031" : "#2d3436" }}>
          예약하기
        </Link>
        {isLogin ? (
          <>
            <div>{user?.name}님</div>
            <LogoutButton onClick={handleClickLogoutButton}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              style={{ color: pathname === "/auth/login" ? "#d63031" : "#2d3436" }}
            >
              로그인
            </Link>
            <Link
              href="/auth/register"
              style={{ color: pathname === "/auth/register" ? "#d63031" : "#2d3436" }}
            >
              회원가입
            </Link>
          </>
        )}
      </Menu>
    </NavBarWrapper>
  );
};
export default NavBar;

const NavBarWrapper = styled.nav`
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: white;
`;
const Menu = styled(FlexBox)`
  gap: 30px;
  margin-right: 50px;
`;
const LogoutButton = styled(SubmitButton)`
  color: white;
  border-radius: 20px;
  width: 80px;
  height: 30px;
  font-size: 14px;
`;
