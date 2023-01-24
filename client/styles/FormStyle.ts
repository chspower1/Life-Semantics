import styled from "styled-components";
import { Col, FlexBox } from "./Common";

export const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 74px;
`;
export const InputBox = styled(Col)<{ isReservation?: boolean }>`
  position: relative;
  align-items: flex-start;
  width: ${(props) => (props.isReservation ? "90%" : "500px")};
  height: ${(props) => (props.isReservation ? "60px" : "80px")};
  margin-bottom: ${(props) => (props.isReservation ? "0px" : "30px")};
`;
export const Label = styled.label`
  color: #2d3436;
  font-size: 16px;
  margin-bottom: 14px;
`;
export const InputStyle = styled.input<{ isReservation?: boolean }>`
  width: 100%;
  height: ${(props) => (props.isReservation ? "30px" : "50px")};
  border: none;
  padding: 0px;
`;
export const SubmitButton = styled.button`
  /* margin-top: 46px; */
  width: 150px;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: #d63031;
  border-radius: 6px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #bd2828;
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  font-size: 12px;
  right: 0px;
  bottom: -16px;
  color: #d45d67;
`;

export const Subtitle = styled.span`
  position: absolute;
  bottom: 100px;
  right: 50%;
  transform: translateX(50%);
  font-size: 16px;
  color: #a0a0a0;
  transition: color 0.3s ease;
  &:hover {
    color: #da1703;
  }
`;
