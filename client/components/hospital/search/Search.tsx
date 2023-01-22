import { selectedHospitalState } from "@/atom";
import Input from "@/components/Input";
import { Button } from "@/styles/FormStyle";
import { ContentBox, ContentTitle, ContentWrapper, Item } from "@/styles/Hospital";
import { Hospital } from "@/types/hospital";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const { getApi: getHospitals } = customApi(
    `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&yadmNm=${searchKeyword}&pageNo=${currentPage}`
  );
  const { data } = useQuery(["hopitalList", searchKeyword, currentPage], getHospitals);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState);

  const onValid = ({ keyword }: { keyword: string }) => {
    setSearchKeyword(keyword);
  };

  const handleClickPageMoveButton = (mode: string) => {
    if (currentPage === 1 && mode === "preview") return;
    else {
      mode === "preview" ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    setHospitals(data?.response.body.items.item);
  }, [data]);
  return (
    <ContentWrapper>
      <ContentTitle>병원리스트</ContentTitle>
      <ContentBox>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            name="keyword"
            label="검색"
            register={register("keyword")}
            errorMessage={errors.keyword?.message || null}
          />
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
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={() => handleClickPageMoveButton("preview")}
      >
        이전
      </button>
      <button onClick={() => handleClickPageMoveButton("next")}>다음</button>
    </ContentWrapper>
  );
};
export default Search;
