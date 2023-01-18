import Input from "@/components/Input";
import { ContentBox } from "@/styles/Hospital";
import { useForm } from "react-hook-form";

interface ReservationForm {
  phone: string;
  symptom: string;
  date: Date;
  image: FormData;
}
const Details = () => {
  const { register } = useForm<ReservationForm>();
  return (
    <ContentBox>
      <div>병원정보</div>
      <form>
        <h1>진료신청</h1>
        <span>이름</span>
        <Input label="전화번호" name="phone" register={register("phone")} />
        <Input label="증상" name="symptom" register={register("symptom")} />
        <Input label="예약일시" name="date" type="date" register={register("date")} />
        <Input label="증상이미지" name="image" type="file" register={register("image")} />
      </form>
    </ContentBox>
  );
};
export default Details;
