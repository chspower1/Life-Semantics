import Details from "@/components/hospital/details/Details";
import Reservation from "@/components/hospital/reservation/Reservation";
import Search from "@/components/hospital/search/Search";

const HospitalPage = () => {
  return (
    <>
      <Search />
      <Reservation />
      <Details />
    </>
  );
};
export default HospitalPage;
