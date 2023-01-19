import { ContentBox, ContentTitle, ContentWrapper } from "@/styles/Hospital";
import HospitalList from "../HospitalList";

const Reservation = () => {
  return (
    <ContentWrapper>
      <ContentTitle>예약 리스트</ContentTitle>
      <ContentBox>
        <HospitalList />
      </ContentBox>
    </ContentWrapper>
  );
};
export default Reservation;
