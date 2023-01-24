import { selectedHospitalAtom, selectedReservationAtom } from "@/atom";
import { ContentBox, ContentTitle, ContentContainer, Item } from "@/styles/Content";
import { Reservation } from "@/types/reservation";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { useRecoilState, useSetRecoilState } from "recoil";
const Reservation = () => {
  const { privateGetApi } = customApi(`http://${window.location.hostname}:8080/reservation`);
  const { data: reservations, isLoading } = useQuery<Reservation[]>(
    ["reservationList"],
    privateGetApi
  );
  const [selectedReservation, setSelectedReservation] = useRecoilState(selectedReservationAtom);
  const setSelectedHospital = useSetRecoilState(selectedHospitalAtom);
  const handleClickReservation = (reservation: Reservation) => {
    setSelectedHospital(null);
    setSelectedReservation(reservation);
  };
  return (
    <ContentContainer>
      <ContentTitle>예약 리스트</ContentTitle>
      <ContentBox>
        {isLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <Skeleton width="500px" height="50px" key={index} />
            ))
          : reservations?.map((reservation) => (
              <Item
                className={reservation.id === selectedReservation?.id ? "active" : "normal"}
                key={reservation.id}
                onClick={() => handleClickReservation(reservation)}
              >
                {reservation.hospitalName}
              </Item>
            ))}
      </ContentBox>
    </ContentContainer>
  );
};
export default Reservation;
