import styled from "styled-components";
import { Col, FlexBox } from "./Common";

export const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 74px;
`;
export const InputBox = styled(Col)`
  position: relative;
  align-items: flex-start;
  width: 500px;
  height: 80px;
  margin-bottom: 30px;
`;
export const Label = styled.label`
  color: #2d3436;
  font-size: 16px;
  margin-bottom: 14px;
`;
export const InputStyle = styled.input`
  width: 500px;
  height: 50px;
  border: none;
`;
export const Button = styled.button`
  /* margin-top: 46px; */
  width: 150px;
  height: 50px;
  font-size: 16px;
  background-color: white;
`;

export const ErrorMessage = styled.span`
  position: absolute;
  font-size: 12px;
  right: -5px;
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
