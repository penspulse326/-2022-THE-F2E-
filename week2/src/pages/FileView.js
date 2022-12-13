import styled from "styled-components";
import Card from "../components/Card";
import { DarkBtn_Long, LightBtn_Long } from "../components/Button";

export default function FileView() {
  const file = [1, 2, 3, 4, 5];
  return (
    <Wrapper>
      <PageSnap>
        <PageSnapWrapper length={file.length}>
          頁面預覽
          {file.map((item, index) => (
            <Card item={item} index={index}></Card>
          ))}
        </PageSnapWrapper>
      </PageSnap>
      <PageView>123</PageView>
      <SignOption>
        <div>
          <LightBtn_Long></LightBtn_Long>
          <LightBtn_Long></LightBtn_Long>
          <LightBtn_Long></LightBtn_Long>
        </div>
        <div>
          <DarkBtn_Long></DarkBtn_Long>
        </div>
      </SignOption>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  bottom: 0;
`;

const PageSnap = styled.div`
  padding: 30px 0px;
  width: 500px;
  height: 100%;
  background-color: white;

  overflow-y: scroll;
`;

const PageSnapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  font-size: 24px;
  font-weight: bold;
`;

const PageView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 920px;
  height: 100%;
  background-color: ${(props) => props.theme.grey};
`;

const SignOption = styled(PageSnap)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
