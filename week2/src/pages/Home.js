import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCloudUpload, BsCamera, BsExclamationCircle } from "react-icons/bs";
import { MQ_MD, MQ_LG } from "../constants/breakpoint";
import styled from "styled-components";
import Logo from "../assets/Logo";
import { UseFileContext } from "../FileContext";
import { DarkBtn, LightBtn } from "../components/Button";
import Wave from "../assets/Wave";
import Mask from "../components/Mask";

const FILE_MAX_SIZE = 1 * 1024 * 1024;

export default function Home() {
  const [isMask, setIsMask] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setFile } = UseFileContext();
  const navigate = useNavigate();

  const handleUpload = ({ target }) => {
    setErrorMessage(null);
    const file = target.files[0];
    if (file.type !== "application/pdf") {
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
      <Wave />
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
        <UploadFrame>
          <label htmlFor="upload">
            <DarkBtn>
              <BsCloudUpload />
              上傳文件
              <input
                id="upload"
                type="file"
                className="select"
                accept="application/pdf"
                onChange={(e) => handleUpload(e)}
                style={{ display: "none" }}
              />
            </DarkBtn>
          </label>
          <Description>
            或拖曳檔案到此處
            <br />
            接受檔案類型：pdf
            {errorMessage && (
              <ErrorMessage>
                <BsExclamationCircle></BsExclamationCircle>
                {errorMessage}
              </ErrorMessage>
            )}
          </Description>
        </UploadFrame>
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
  -webkit-text-stroke: 1px black;
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
  height: 100vh;

  ${MQ_MD} {
    flex-direction: row;
    justify-content: center;
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
  top: -50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10%;
  width: 80%;
  height: auto;

  ${MQ_MD} {
    left: 5%;
    justify-content: space-between;
    width: 40%;
    height: 450px;
  }

  ${MQ_LG} {
    height: 500px;
  }
`;

const UploadFrame = styled.div`
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
    font-size: 14px;
  }
  ${MQ_LG} {
    font-size: 18px;
  }
`;
