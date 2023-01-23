import { selectedHospitalAtom, selectedReservationAtom, userAtom } from "@/atom";
import Input from "@/components/Input";
import { FlexBox } from "@/styles/Common";
import { ContentBox, ContentTitle, ContentContainer } from "@/styles/Hospital";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import IconAddImage from "@/src/icon_addImage.png";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { InputBox, Label, SubmitButton } from "@/styles/FormStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@/utils/customApi";
import { getCurrentDate } from "@/utils/getCurrentDate";

interface ReservationForm {
  name: string;
  phone: string;
  symptom: string;
  date: Date;
  imageUrl: FileList;
}
const Details = () => {
  const user = useRecoilValue(userAtom);
  const selectedHospital = useRecoilValue(selectedHospitalAtom);
  const selectedReservation = useRecoilValue(selectedReservationAtom);
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationForm>({
    defaultValues: {
      name: user?.name,
    },
  });
  const { ref, ...rest } = register("imageUrl");

  const { deleteApi, postApi, putApi } = customApi("http://localhost:8080/reservation");
  const { mutate: createReservationMutate } = useMutation(["createReservation"], postApi);
  const { mutate: updateReservationMutate } = useMutation(["updateReservation"], putApi);
  const { mutate: deleteReservationMutate } = useMutation(["deleteReservation"], deleteApi);

  const onValid = ({ phone, symptom, date, imageUrl }: ReservationForm) => {
    console.log(date);
    createReservationMutate({
      userId: user?.id,
      hospitalName: selectedHospital?.yadmNm,
      hospitalAddress: selectedHospital?.addr,
      hospitalTel: selectedHospital?.telno,
      hospitalDepartment: "dd",
      phone,
      date: date,
      symptom,
      imageUrl: "ss",
    });
  };
  const uploadImage = () => {
    imageRef.current?.click();
  };
  useEffect(() => {
    const image = watch("imageUrl");
    if (image && image.length > 0) {
      setImagePreview(URL.createObjectURL(image[0]));
      console.log(URL.createObjectURL(image[0]));
    }
  }, [watch("imageUrl")]);

  return (
    <ContentContainer>
      <ContentTitle>상세정보</ContentTitle>
      <ContentBox>
        <HospitalInfo>
          <BoxTitle>병원정보</BoxTitle>
          <DetailItem>
            <Title>병원명</Title>
            <Description>
              {selectedHospital && selectedHospital?.yadmNm}
              {selectedReservation && selectedReservation?.hospitalName}
            </Description>
          </DetailItem>
          <DetailItem>
            <Title>주소</Title>
            <Description>
              {selectedHospital && selectedHospital?.addr}
              {selectedReservation && selectedReservation?.hospitalAddress}
            </Description>
          </DetailItem>
          <DetailItem>
            <Title>전화번호</Title>
            <Description>
              {selectedHospital && selectedHospital?.telno}
              {selectedReservation && selectedReservation?.hospitalTel}
            </Description>
          </DetailItem>
          <DetailItem>
            <Title>진료과</Title>
            <Description>
              {selectedHospital && selectedHospital?.clCdNm}
              {selectedReservation && selectedReservation?.hospitalDepartment}
            </Description>
          </DetailItem>
        </HospitalInfo>
        <Apply as="form" onSubmit={handleSubmit(onValid)}>
          <BoxTitle>진료신청</BoxTitle>
          <Input
            isReservation
            label="이름"
            name="name"
            register={register("name", {
              required: "입력해주세요",
            })}
            disabled={true}
            errorMessage={errors.name?.message || null}
          />
          <Input
            isReservation
            label="전화번호"
            name="phone"
            register={register("phone", {
              required: "전화번호를 입력해주세요!",
            })}
            errorMessage={errors.phone?.message || null}
          />
          <Input
            isReservation
            label="증상"
            name="symptom"
            register={register("symptom", {
              required: "증상을 입력해주세요!",
            })}
            errorMessage={errors.symptom?.message || null}
          />
          <Input
            isReservation
            label="예약일시"
            name="date"
            type="date"
            register={register("date", {
              required: "날짜를 입력해주세요!",
            })}
            min={getCurrentDate()}
            errorMessage={errors.date?.message || null}
          />

          <InputBox isReservation style={{ height: "200px", position: "relative" }}>
            <Label htmlFor="image">증상이미지</Label>
            <ImageInput
              id="iamge"
              type="file"
              {...rest}
              ref={(e) => {
                ref(e);
                imageRef.current = e;
              }}
            />
            {imagePreview ? (
              <ImageBox onClick={uploadImage}>
                <Image
                  style={{ objectFit: "scale-down" }}
                  fill
                  src={imagePreview}
                  alt="이미지 미리보기"
                />
              </ImageBox>
            ) : (
              <UploadImageButton onClick={uploadImage} type="button" />
            )}
          </InputBox>

          <SubmitButton>예약하기</SubmitButton>
        </Apply>
      </ContentBox>
    </ContentContainer>
  );
};
export default Details;
const HospitalInfo = styled(FlexBox)`
  flex-direction: column;
  background-color: white;
  gap: 10px;
  width: 80%;
  height: 190px;
`;
const Apply = styled(HospitalInfo)`
  height: 600px;
  background-color: #c7c7c7;
`;
const DetailItem = styled(FlexBox)`
  width: 90%;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
`;
const Description = styled.p`
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
const BoxTitle = styled.div`
  font-size: 20px;
`;
const UploadImageButton = styled.button`
  width: 100%;
  height: 150px;
  background: #cfb0b0 url(${IconAddImage.src}) no-repeat 50% 50%/20%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  position: absolute;
  right: -3000px;
`;
const ImageBox = styled.div`
  position: relative;
  margin: 0px auto;
  padding: 75px;
`;
