import { ContentBox, ContentTitle, ContentContainer } from "@/styles/Hospital";
import HospitalList from "../HospitalList";

const Reservation = () => {
  return (
    <ContentContainer>
      <ContentTitle>예약 리스트</ContentTitle>
      <ContentBox>
        <HospitalList />
      </ContentBox>
    </ContentContainer>
  );
};
export default Reservation;
