import styled from "styled-components";
import Logo from "../components/Logo";
import { DarkBtn, LightBtn } from "../components/Button";
import { BsCloudUpload, BsCamera, BsExclamationCircle } from "react-icons/bs";
import { useState } from "react";

const FILE_MAX_SIZE = 1 * 1024 * 1024;

export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpload = ({ target }) => {
    setErrorMessage(null);
    const file = target.files[0];
    console.log(file.type);
    if (
      file.type !== "application/pdf" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      setErrorMessage("不接受該檔案類型");
    }
    if (file.size > FILE_MAX_SIZE) {
      setErrorMessage("檔案尺寸太大");
    }
  };
  return (
    <Wrapper>
      <Wave_1 />
      <Wave_2 />
      <TitleWrapper>
        <Title>
          <Logo />
          急速簽名
        </Title>
        <Subtitle>
          快速簡便的線上文件簽名工具
          <br />
          立即開始，無須註冊帳戶
        </Subtitle>
      </TitleWrapper>
      <UploadWrapper>
        <Frame>
          <label htmlFor="upload">
            <DarkBtn>
              <BsCloudUpload />
              上傳文件
              <input
                id="upload"
                type="file"
                className="select"
                accept="application/pdf image/jpg+jpeg+png"
                onChange={(e) => handleUpload(e)}
                style={{ display: "none" }}
              />
            </DarkBtn>
          </label>
          <Description>
            或拖曳檔案到此處
            <br />
            接受檔案類型：pdf、jpg、png
            {errorMessage && (
              <ErrorMessage>
                <BsExclamationCircle></BsExclamationCircle>
                {errorMessage}
              </ErrorMessage>
            )}
          </Description>
        </Frame>
        <LightBtn>
          <BsCamera />
          拍攝文件
        </LightBtn>
      </UploadWrapper>
    </Wrapper>
  );
}

const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 30px;

  color: red;

  svg {
    margin-right: 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Wave_1 = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 215px;
  background-image: url("./images/wave1.svg");
  background-repeat: no-repeat;
  background-position: bottom;
`;

const Wave_2 = styled(Wave_1)`
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 244px;
  background-image: url("./images/wave2.svg");
  background-repeat: no-repeat;
  background-position: right;
`;

const TitleWrapper = styled.div`
  position: relative;
  top: 50px;
  left: 10%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-weight: bold;

  a {
    transform: scale(1.1);
  }
`;

const Subtitle = styled.div`
  margin-top: 30px;
  font-size: 24px;
  line-height: 50px;
  font-weight: 600;
`;

const UploadWrapper = styled.div`
  position: relative;
  top: 100px;
  left: 20%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 960px;
  height: 650px;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  border: 4px dashed ${(props) => props.theme.primary};
`;

const Description = styled.div`
  margin-top: 30px;

  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;
