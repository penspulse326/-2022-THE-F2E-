import styled from "styled-components";
import Logo from "../components/Logo";
import { DarkBtn, LightBtn } from "../components/Button";
import { BsCloudUpload, BsCamera, BsExclamationCircle } from "react-icons/bs";
import { useState } from "react";
import { MQ_MD, MQ_LG } from "../constants/breakpoint";
import { UseFileContext } from "../FileContext";
import { useNavigate } from "react-router-dom";
import { Mask } from "../components/Mask";

const FILE_MAX_SIZE = 1 * 1024 * 1024;

export default function Home() {
  const [isMask, setIsMask] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { File, setFile } = UseFileContext();
  const navigate = useNavigate();

  const handleUpload = ({ target }) => {
    setErrorMessage(null);
    const file = target.files[0];
    if (
      file.type !== "application/pdf" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      setErrorMessage("不接受該檔案類型");
    } else if (file.size > FILE_MAX_SIZE) {
      setErrorMessage("檔案尺寸太大");
    } else {
      setFile(() => file);
      setIsMask(true);
      setTimeout(() => navigate("fileview"), 1500);
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
      {isMask && (
        <Mask>
          <LoadingText>上傳中</LoadingText>
        </Mask>
      )}
    </Wrapper>
  );
}

const LoadingText = styled.span`
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 1 1 1 1 #333;
`;

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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;

  ${MQ_MD} {
    flex-direction: row;
    justify-content: center;
  }
`;

const Wave_1 = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 215px;

  background-repeat: no-repeat;
  background-position: bottom;

  ${MQ_MD} {
    display: block;
    background-image: url("./images/wave1.svg");
  }
`;

const Wave_2 = styled(Wave_1)`
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 244px;

  background-repeat: no-repeat;
  background-position: right;

  ${MQ_MD} {
    display: block;
    background-image: url("./images/wave2.svg");
  }
`;

const TitleWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 90px;

  font-size: 48px;
  font-weight: bold;

  a {
    transform: scale(1.1);
  }

  ${MQ_MD} {
    font-size: 56px;
  }
  ${MQ_LG} {
    font-size: 64px;
  }
`;

const Subtitle = styled.div`
  margin-top: 30px;

  line-height: 40px;
  text-align: center;
  font-weight: bold;

  ${MQ_MD} {
    font-size: 20px;
  }
  ${MQ_LG} {
    font-size: 24px;
  }
`;

const UploadWrapper = styled.div`
  position: relative;
  top: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 90px;
  width: 80%;
  height: auto;

  ${MQ_MD} {
    left: 5%;
    justify-content: space-between;
    width: 40%;
    height: 450px;
  }

  ${MQ_LG} {
    height: 650px;
  }
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;

  ${MQ_MD} {
    width: 100%;
    height: 70%;
    border: 4px dashed ${(props) => props.theme.primary};
  }
`;

const Description = styled.div`
  font-weight: 700;
  text-align: center;
  display: none;

  ${MQ_MD} {
    display: block;
    margin-top: 18px;
    font-size: 14px;
  }
  ${MQ_LG} {
    margin-top: 30px;
    font-size: 18px;
  }
`;
