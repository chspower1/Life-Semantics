import { selectedHospitalState } from "@/atom";
import Input from "@/components/Input";
import { Button } from "@/styles/FormStyle";
import { ContentBox, ContentTitle, ContentWrapper, Item } from "@/styles/Hospital";
import { Hospital } from "@/types/hospital";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import HospitalList from "../HospitalList";
interface SearchProps {
  hospitals: Hospital[] | undefined;
}
interface SearchForm {
  keyword: string;
}
const Search = ({ hospitals }: SearchProps) => {
  const { register } = useForm<SearchForm>();
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState);
  return (
    <ContentWrapper>
      <ContentTitle>병원리스트</ContentTitle>
      <ContentBox>
        <Input name="keyword" label="검색" register={register("keyword")} />
        <Button>검색</Button>
        {hospitals?.map((hospital) => (
          <Item
            className={hospital.postNo === selectedHospital?.postNo ? "active" : "normal"}
            key={hospital.postNo}
            onClick={() => setSelectedHospital(hospital)}
          >
            {hospital.yadmNm}
          </Item>
        ))}
      </ContentBox>
    </ContentWrapper>
  );
};
export default Search;
