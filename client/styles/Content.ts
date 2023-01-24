import styled from "styled-components";
import { FlexBox } from "./Common";
export const ContentContainer = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 33.3%;
  height: 100%;
  background-color: ${(props) => props.bgColor || "#dfdfdf"};
`;
export const ContentTitle = styled(FlexBox)`
  margin-top: 100px;
  width: 100%;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
`;
export const ContentBox = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 80%;
  gap: 10px;
`;
export const Item = styled(FlexBox)`
  width: 80%;
  height: 50px;
  background-color: white;
  text-align: center;
  border-radius: 6px;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 0px 0px 3px #d63031;
  }
  &.active {
    color: white;
    background-color: #d63031;
    box-shadow: 0px 0px 0px 3px #d63031;
  }
`;
