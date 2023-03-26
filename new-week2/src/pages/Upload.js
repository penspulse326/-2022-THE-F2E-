import { useState } from "react";
import styled from "styled-components";
import { MQ_SM, MQ_XS, MQ_MD, MQ_LG } from "../constants/breakpoint";

export default function Home() {
  const [tab, setTab] = useState(1);

  return (
    <Container>
      <Wrapper>
        <TabGroup>
          <Tab tab={tab} num={1} onClick={() => setTab(1)}>
            上傳新文件
          </Tab>
          <Tab tab={tab} num={2} onClick={() => setTab(2)}>
            選擇已上傳文件
          </Tab>
        </TabGroup>
        <UploadWrapper>
          <UploadBox></UploadBox>
        </UploadWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.grey.mid};
`;

const Wrapper = styled.div`
  width: 80%;
  height: 70%;

  background-color: ${({ theme }) => theme.main};
  border-radius: 35px;
`;

const TabGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
`;

const Tab = styled.button`
  width: 50%;
  border-radius: 35px 35px 0px 0px;
  font-size: 1.25rem;

  background-color: ${({ theme, tab, num }) =>
    tab === num ? "white" : theme.main};

  color: ${({ theme, tab, num }) =>
    tab === num ? theme.primary : theme.secondary};

  box-shadow: ${({ tab, num }) =>
    tab === num &&
    (num === 1 ? "8" : "-8") + "px 8px 4px 4px rgba(238, 237, 232, 0.5)"};

  z-index: ${({ tab, num }) => tab === num && 99};
`;

const UploadWrapper = styled.div`
  position: relative;
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: white;

  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
`;

const UploadBox = styled.div`
  width: 90%;
  height: 80%;

  background-color: ${({ theme }) => theme.main};
  border: 1px dashed ${({ theme }) => theme.grey.dark};
  border-radius: 35px;
`;
