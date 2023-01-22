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
  flex-direction: column;
  width: 100%;
  height: 80%;
  gap: 10px;
`;
export const Item = styled(FlexBox)`
  width: 80%;
  height: 100px;
  background-color: white;
  transition: box-shadow 0.3s ease;
  &.active {
    box-shadow: 0px 0px 0px 3px black;
  }
`;
