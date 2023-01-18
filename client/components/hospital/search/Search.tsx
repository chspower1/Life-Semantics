import Input from "@/components/Input";
import { Button } from "@/styles/FormStyle";
import { ContentBox } from "@/styles/Hospital";
import { useForm } from "react-hook-form";
import HospitalList from "../HospitalList";

interface SearchForm {
  keyword: string;
}
const Search = () => {
  const { register } = useForm<SearchForm>();
  return (
    <ContentBox>
      <Input name="keyword" label="검색" register={register("keyword")} />
      <Button>검색</Button>
      <HospitalList />
    </ContentBox>
  );
};
export default Search;
