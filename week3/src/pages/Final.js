import { useState, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { NormalDialog, ChatFrame } from "../components/ChatFrame";
import { NamedWorker, Worker3 } from "../components/Workers";
import { useUser } from "../contexts/UserContext";
import { GreyButton } from "../components/Buttons";
import { pageTransition } from "../utils";
import { ReactComponent as Hex } from "../components/svg/Hex.svg";
import { useNavigate } from "react-router-dom";

export default function Final() {
  // user data
  //const { user } = useUser();
  const user = { gender: "male", name: "shin" };
  // dom state
  const [progress, setProgress] = useState(2);
  const navigate = useNavigate();

  return (
    <StageWrapper className="stage1">
      {progress === 0 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[0]}</div>
            {progress === 1 && (
              <div onClick={() => setProgress((state) => state + 1)}>
                <GreyButton content="繼續" />
              </div>
            )}
          </NormalDialog>
          <NamedWorker
            number={3}
            name={"小廣"}
            tagTop={"170px"}
            bottom={"-160px"}
          ></NamedWorker>
        </>
      )}
      {progress === 2 && <CertificateBox user={user}></CertificateBox>}
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
  top: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 595px;
  height: 824px;

  color: ${(props) => props.theme.colors.dark_grey};
  font-size: 25px;

  transform: scale(1.15);
`;

const Title = styled.div`
  position: relative;
  top: 0px;
  font-weight: 700;
`;

const Text = styled.div`
  position: relative;
  top: 50px;
  font-weight: 500;
  text-align: center;
  line-height: 50px;
`;

const Date = styled(Text)`
  top: 240px;
  font-size: 20px;
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

const Avatar = styled.img`
  content: url("./images/${(props) => props.gender}_icon.png");
  position: absolute;
  top: -50px;
  left: -30px;
  transform: scale(0.8);
`;

const CertificateBox = ({ user }) => {
  console.log(user);
  return (
    <Certificate>
      <Hex></Hex>
      <CertificateContent>
        <Avatar gender={"female"} />
        <Title>結業證書</Title>
        <Text>
          {user.name} 君<br />
          於111年11月OO日參加六角學院
          <br />
          Scrum新手培訓營，經測驗合格
          <br />
          特發給結業證書以資證明。
          <br />
          <br />
        </Text>
        <Text style={{ top: "240px" }}>六角學院波利馬資訊科技有限公司</Text>
        <Date>中華民國111年11月11日</Date>
      </CertificateContent>
    </Certificate>
  );
};

const text = [
  <>
    恭喜你通過 Scrum 新手村！ 正式加入六角學院開發 A
    組的大家庭！這是你的結業證書：
  </>,
];
