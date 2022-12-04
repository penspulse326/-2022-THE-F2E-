import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { NormalDialog } from "../components/ChatFrame";
import {
  NamedWorker,
  Worker3,
  Worker2,
  Worker1,
  Worker4,
} from "../components/Workers";
import { useUser } from "../contexts/UserContext";
import { GreyButton } from "../components/Buttons";
import { pageTransition } from "../utils";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

export default function Final() {
  const divRef = useRef(null);
  // user data
  const { user } = useUser();
  // dom state
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress === 2) {
      gsap.timeline().from("#certificate", {
        yPercent: -100,
        duration: 5,
      });
    }
  });

  const handleScreenShot = async () => {
    const element = divRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleBackToHome = () => {
    pageTransition("body", navigate, "../");
  };

  const handleFinal = () => {
    pageTransition("body", () => {}, "");
    setTimeout(() => setProgress((state) => ++state), 2000);
  };

  const dateObj = new Date();
  const taiwanDate = `${dateObj.getFullYear() - 1911} 年 ${
    dateObj.getMonth() + 1
  } 月 ${dateObj.getDate()} 日`;

  return (
    <StageWrapper>
      {progress === 1 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[0]}</div>
            <div onClick={() => handleFinal()}>
              <GreyButton content="繼續" />
            </div>
          </NormalDialog>
          <NamedWorker
            number={3}
            name={"小廣"}
            tagTop={"170px"}
            bottom={"-180px"}
          ></NamedWorker>
        </>
      )}
      {progress === 2 && (
        <>
          <Certificate id="certificate" ref={divRef}>
            <CertificateContent>
              <Avatar gender={user.gender} />
              <Title>結業證書</Title>
              <Text>
                {user.name} 君<br />於{taiwanDate}參加六角學院
                <br />
                Scrum新手培訓營，經測驗合格
                <br />
                特發給結業證書以資證明。
                <br />
                <br />
              </Text>
              <Text style={{ top: "400px" }}>
                六角學院波利馬資訊科技有限公司
              </Text>
              <DateTime>中華民國{taiwanDate}</DateTime>
            </CertificateContent>
          </Certificate>
          <ScreenShot onClick={() => handleScreenShot()} />
          <BackToHome onClick={() => handleBackToHome()} />
          <WokerWrapper>
            <Worker1 style={{ left: "-500px" }} />
            <Worker3 style={{ left: "-450px" }} />
            <Worker2 style={{ left: "450px" }} />
            <Worker4 style={{ left: "500px" }} />
          </WokerWrapper>
        </>
      )}
    </StageWrapper>
  );
}
const CertificateContent = styled.div`
  position: absolute;
  top: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Certificate = styled.div`
  position: absolute;
  top: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 705px;
  height: 1000px;

  background-image: url("./images/expo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  border-radius: 30px;

  color: ${(props) => props.theme.colors.dark_grey};
  font-size: 32px;

  box-sizing: border-box;
  transform: scale(0.9);
`;

const Title = styled.div`
  position: relative;
  top: 10px;
  font-weight: 700;
`;

const Text = styled.div`
  position: relative;
  top: 100px;
  font-weight: 500;
  text-align: center;
  line-height: 50px;
`;

const DateTime = styled(Text)`
  top: 400px;
  font-size: 28px;
`;

const StageWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Avatar = styled.div`
  background-image: ${(props) =>
    props.gender === "male"
      ? "url('./images/male_icon.png')"
      : "url('./images/female_icon.png')"};

  background-repeat: no-repeat;
  background-position: bottom;
  position: absolute;
  top: -50px;
  left: -30px;

  width: 153px;
  height: 188px;
`;

const text = [
  <>
    恭喜你通過 Scrum 新手村！ 正式加入六角學院開發 A
    組的大家庭！這是你的結業證書：
  </>,
];

const BackToHome = styled.div`
  position: absolute;
  top: 180px;
  right: 240px;
  width: 154px;
  height: 172px;
  background-image: url("./images/home.png");

  cursor: pointer;
`;

const ScreenShot = styled.div`
  position: absolute;
  top: 30px;
  right: 240px;
  width: 154px;
  height: 172px;
  background-image: url("./images/shot.png");

  cursor: pointer;
`;

const WokerWrapper = styled.div`
  position: absolute;
  top: 440px;
  display: flex;
  transform: scale(0.575);

  div {
    position: relative;
  }
`;
