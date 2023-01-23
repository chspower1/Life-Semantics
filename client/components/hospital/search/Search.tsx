import { selectedHospitalAtom, selectedReservationAtom } from "@/atom";
import Input from "@/components/Input";
import { FlexBox } from "@/styles/Common";
import { SubmitButton } from "@/styles/FormStyle";
import { ContentBox, ContentTitle, ContentContainer, Item } from "@/styles/Hospital";
import { Hospital } from "@/types/hospital";
import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
interface SearchProps {
  hospitals: Hospital[] | undefined;
}
interface SearchForm {
  keyword: string;
}
const Search = () => {
  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalAtom);
  const [selectedReservation, setSelectedReservation] = useRecoilState(selectedReservationAtom);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { getApi: getHospitals } = customApi(
    `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&yadmNm=${searchKeyword}&pageNo=${currentPage}`
  );
  const { data, isLoading } = useQuery(["hopitalList", searchKeyword, currentPage], getHospitals);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();

  const onValid = ({ keyword }: { keyword: string }) => {
    setCurrentPage(1);
    setSearchKeyword(keyword);
  };

  const handleClickPageMoveButton = (mode: string) => {
    if (currentPage === 1 && mode === "preview") return;
    else if (currentPage === lastPage && mode === "next") return;
    else {
      mode === "preview" ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage + 1);
    }
  };

  const handleClickHospital = (hospital: Hospital) => {
    setSelectedReservation(null);
    setSelectedHospital(hospital);
  };
  useEffect(() => {
    console.log(data);
    if (data) {
      setLastPage(Math.ceil(data?.response.body.totalCount / 10));
      setHospitals(data?.response.body.items.item);
    }
  }, [data]);
  console.log(hospitals);
  return (
    <ContentContainer>
      <ContentTitle>병원리스트</ContentTitle>
      <ContentBox>
        <SearchForm as="form" onSubmit={handleSubmit(onValid)}>
          <Input
            name="keyword"
            label=""
            register={register("keyword")}
            errorMessage={errors.keyword?.message || null}
          />
          <SearchButton>검색</SearchButton>
        </SearchForm>
        {isLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <Skeleton width="500px" height="50px" key={index} />
            ))
          : hospitals?.map((hospital) => (
              <Item
                className={hospital.postNo === selectedHospital?.postNo ? "active" : "normal"}
                key={hospital.yadmNm + hospital.XPos + hospital.YPos}
                onClick={() => handleClickHospital(hospital)}
              >
                {hospital.yadmNm}
              </Item>
            ))}
        <PreviusButton
          disabled={currentPage === 1 ? true : false}
          onClick={() => handleClickPageMoveButton("preview")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </PreviusButton>
        <NextButton
          disabled={currentPage === lastPage ? true : false}
          onClick={() => handleClickPageMoveButton("next")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </NextButton>
      </ContentBox>
      <PagePointer>
        {currentPage}/{lastPage}
      </PagePointer>
    </ContentContainer>
  );
};
export default Search;

const SearchForm = styled(FlexBox)`
  position: relative;
`;
const SearchButton = styled.button`
  position: absolute;
  right: 0px;
  width: 60px;
  height: 50px;
  margin-bottom: 16px;
  color: white;
  background-color: #d63031;
`;
const NextButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  bottom: 40%;
`;
const PreviusButton = styled(NextButton)`
  position: absolute;
  left: 0px;
  bottom: 40%;
`;
const PagePointer = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: center;
`;
