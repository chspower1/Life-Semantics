import Details from "@/components/hospital/details/Details";
import Reservation from "@/components/hospital/reservation/Reservation";
import Search from "@/components/hospital/search/Search";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const HospitalPage = () => {
  const { getApi: getHospitals } = customApi(
    `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const { data } = useQuery(["hopitalList"], getHospitals, {
    onSuccess(data) {
      console.log(data);
      console.log(data.response.body.items.item);
    },
  });
  return (
    <HospitalWrapper>
      <Search hospitals={data?.response.body.items.item} />
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
