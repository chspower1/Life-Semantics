import styled from "styled-components";
import { Col, FlexBox } from "./Common";

export const Form = styled.form``;
export const InputBox = styled(Col)`
  position: relative;
  align-items: flex-start;
  width: 500px;
  height: 80px;
`;
export const Label = styled.label`
  font-size: 14px;
`;
export const InputStyle = styled.input`
  width: 500px;
  height: 50px;
`;
export const Button = styled.button``;
export const ErrorMessage = styled.span`
  position: absolute;
  font-size: 12px;
  right: 0px;
  bottom: -10px;
  color: #d45d67;
`;
