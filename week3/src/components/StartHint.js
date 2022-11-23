import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatFrame from "./ChatFrame";
import NameTag from "./NameTag";
import { Worker2 } from "./Workers";
import StartButton from "./StartButton";
import { useNavigate } from "react-router-dom";

const SmallBox = styled(ChatFrame)`
  position: absolute;
  left: 15.62%;
  right: 65.99%;
  top: 16.11%;
  bottom: 72.59%;
  height: 122px;
  width: 353px;

  text-align: center;
  font-size: 32px;
`;
const LargeBox = styled(ChatFrame)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 80px 140px;

  position: absolute;
  width: 888px;
  height: 551px;
  left: 300px;
  top: 137px;
  box-sizing: border-box;

  div {
    position: relative;
    top: 0;
    left: 0;
    font-size: 32px;
    font-weight: 500;
    line-height: 180%;
  }
`;
const Dot = styled.div`
  height: 11px;
  width: 11px;
  border-radius: 100%;
  background: ${(props) => props.theme.colors.mid_grey};
  margin: 0 9px;
`;

const WorkerStart = styled(Worker2)`
  position: fixed;
  width: 248px;
  height: 380px;
  left: 1295px;
  top: 719px;
  background-size: contain;
`;

const Name = styled(NameTag)`
  top: -30px;
  left: 120px;
`;

export default function StartHint() {
  const [logState, setLogState] = useState(true);

  useEffect(() => {
    if (!logState) {
      setTimeout(() => setLogState(true), 1500);
    }
    //return () => setLogState(false);
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    console.log(123);
  };

  return (
    <div>
      {logState ? (
        <LargeBox>
          <div>
            菜鳥！恭喜你成為六角學院的正式員工啦！ <br />
            在正式加入專案開發之前，
            <br />
            需要請你先了解 Scrum 的流程與精神！
            <br />
            <br />
            成功通過 Scrum 新手村的試煉吧！
          </div>
          <div onClick={() => alert(123)}>
            <StartButton />
          </div>
        </LargeBox>
      ) : (
        <SmallBox>
          <Dot />
          <Dot />
          <Dot />
        </SmallBox>
      )}
      <WorkerStart>
        <Name>？？？</Name>
      </WorkerStart>
    </div>
  );
}
