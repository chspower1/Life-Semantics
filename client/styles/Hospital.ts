import styled from "styled-components";
import { FlexBox } from "./Common";
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 33%;
  height: 100%;
`;
export const ContentTitle = styled(FlexBox)`
  width: 100%;
  height: 50px;
`;
export const ContentBox = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  height: 80%;
  background-color: #999999;
  gap: 10px;
`;
export const Item = styled(FlexBox)`
  width: 90%;
  height: 100px;
  background-color: white; ;
`;
