import { selectedHospitalState } from "@/atom";
import Input from "@/components/Input";
import { Button } from "@/styles/FormStyle";
import { ContentBox, ContentTitle, ContentWrapper, Item } from "@/styles/Hospital";
import { Hospital } from "@/types/hospital";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import HospitalList from "../HospitalList";
interface SearchProps {
  hospitals: Hospital[] | undefined;
}
interface SearchForm {
  keyword: string;
}
const Search = () => {
  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { getApi: getHospitals } = customApi(
    `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&yadmNm=${searchKeyword}`
  );
  const { refetch } = useQuery(["hopitalList", searchKeyword], getHospitals, {
    onSuccess(data) {
      console.log(data);
      setHospitals(data.response.body.items.item);
    },
  });
  const { register, handleSubmit } = useForm<SearchForm>();
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState);
  const onValid = ({ keyword }: { keyword: string }) => {
    setSearchKeyword(keyword);
    refetch();
  };
  return (
    <ContentWrapper>
      <ContentTitle>병원리스트</ContentTitle>
      <ContentBox>
        <form onSubmit={handleSubmit(onValid)}>
          <Input name="keyword" label="검색" register={register("keyword")} />
          <Button>검색</Button>
        </form>
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
