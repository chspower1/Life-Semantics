import { FlexBox } from "@/styles/Common";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavBarWrapper>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={268} height={38} />
      </Link>
      <Menu>
        <Link href="/hospital">예약하기</Link>
        <Link href="/auth/login">로그인</Link>
        <Link href="/auth/register">회원가입</Link>
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
