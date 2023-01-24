import { userAtom } from "@/atom";
import Details from "@/components/hospital/details/Details";
import Reservation from "@/components/hospital/reservation/Reservation";
import Search from "@/components/hospital/search/Search";
import { Col, Row } from "@/styles/Common";
import { SubmitButton } from "@/styles/FormStyle";
import { NextPage } from "next";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const HospitalPage: NextPage = () => {
  const user = useRecoilValue(userAtom);
  return (
    <HospitalWrapper>
      {user ? (
        <>
          <Search />
          <Reservation />
          <Details />
        </>
      ) : (
        <Col>
          <div style={{ fontSize: "32px", marginBottom: "20px" }}>로그인 후 이용해주세요.</div>
          <Row style={{ gap: "20px" }}>
            <Link href="/auth/login">
              <SubmitButton>로그인</SubmitButton>
            </Link>
            <Link href="/auth/register">
              <SubmitButton>회원가입</SubmitButton>
            </Link>
          </Row>
        </Col>
      )}
    </HospitalWrapper>
  );
};
export default HospitalPage;

const HospitalWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
