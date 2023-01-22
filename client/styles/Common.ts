import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Row = styled(FlexBox)`
  position: relative;
`;
export const Col = styled(Row)`
  flex-direction: column;
`;

export const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
`;
