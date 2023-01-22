import Details from "@/components/hospital/details/Details";
import Reservation from "@/components/hospital/reservation/Reservation";
import Search from "@/components/hospital/search/Search";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

const HospitalPage: NextPage = () => {
  return (
    <HospitalWrapper>
      <Search />
      <Reservation />
      <Details />
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
`;
