import Input from "@/components/Input";
import { Button } from "@/styles/FormStyle";
import { ContentBox, ContentTitle, ContentWrapper, Item } from "@/styles/Hospital";
import { Hospital } from "@/types/hospital";
import { useForm } from "react-hook-form";
import HospitalList from "../HospitalList";
interface SearchProps {
  hospitals: Hospital[] | undefined;
}
interface SearchForm {
  keyword: string;
}
const Search = ({ hospitals }: SearchProps) => {
  const { register } = useForm<SearchForm>();
  return (
    <ContentWrapper>
      <ContentTitle>병원리스트</ContentTitle>
      <ContentBox>
        <Input name="keyword" label="검색" register={register("keyword")} />
        <Button>검색</Button>
        {hospitals?.map((hospital) => (
          <Item key={hospital.postNo}>{hospital.yadmNm}</Item>
        ))}
      </ContentBox>
    </ContentWrapper>
  );
};
export default Search;
