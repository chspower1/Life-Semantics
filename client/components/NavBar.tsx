import { FlexBox } from "@/styles/Common";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavBarWrapper>
      <Image src="/logo.png" alt="logo" width={268} height={38} />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
`;
const Menu = styled(FlexBox)`
  gap: 10px;
`;
