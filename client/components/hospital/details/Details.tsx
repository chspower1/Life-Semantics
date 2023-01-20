import { selectedHospitalState } from "@/atom";
import Input from "@/components/Input";
import { FlexBox } from "@/styles/Common";
import { ContentBox, ContentTitle, ContentWrapper } from "@/styles/Hospital";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface ReservationForm {
  phone: string;
  symptom: string;
  date: Date;
  image: FileList;
}
const Details = () => {
  const selectedHospital = useRecoilValue(selectedHospitalState);
  const [imagePreview, setImagePreview] = useState("");

  const { register, handleSubmit, watch } = useForm<ReservationForm>();

  const onValid = (reservationForm: ReservationForm) => {
    console.log(reservationForm);
  };

  useEffect(() => {
    const image = watch("image");
    if (image && image.length > 0) {
      setImagePreview(URL.createObjectURL(image[0]));
    }
  }, [watch("image")]);
  return (
    <ContentWrapper>
      <ContentTitle>상세정보</ContentTitle>
      <ContentBox>
        <div>병원정보</div>
        <DetailItem>
          <Title>병원명</Title>
          <Description>{selectedHospital?.yadmNm}</Description>
        </DetailItem>
        <DetailItem>
          <Title>주소</Title>
          <Description>{selectedHospital?.addr}</Description>
        </DetailItem>
        <DetailItem>
          <Title>전화번호</Title>
          <Description>{selectedHospital?.telno}</Description>
        </DetailItem>
        <DetailItem>
          <Title>진료과</Title>
          <Description>{selectedHospital?.yadmNm}</Description>
        </DetailItem>
        <form>
          <h1>진료신청</h1>
          <span>이름</span>
          <Input label="전화번호" name="phone" register={register("phone")} />
          <Input label="증상" name="symptom" register={register("symptom")} />
          <Input label="예약일시" name="date" type="date" register={register("date")} />
          <Input label="증상이미지" name="image" type="file" register={register("image")} />
          <Image src={imagePreview} width={100} height={100} alt="이미지 미리보기" />
          <button>예약하기</button>
        </form>
      </ContentBox>
    </ContentWrapper>
  );
};
export default Details;

const DetailItem = styled(FlexBox)`
  width: 90%;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;
const Description = styled.p`
  font-size: 16px;
`;
