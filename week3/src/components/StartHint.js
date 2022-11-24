import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatFrame from "./ChatFrame";
import { NamedWorker2 } from "./Workers";
import { StartButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../utils";

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
  width: 888px;
  height: 551px;
  left: 300px;
  top: 137px;
`;

const Dot = styled.div`
  height: 11px;
  width: 11px;
  border-radius: 100%;
  background: ${(props) => props.theme.colors.mid_grey};
  margin: 0 9px;
`;

export default function StartHint() {
  const [logState, setLogState] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    if (!logState) {
      setTimeout(() => setLogState(true), 1500);
    }
    //return () => setLogState(false);
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    pageTransition("body", navigate, "/createAvatar");
  };

  return (
    <div className="home__container" ref={pageRef}>
      {logState ? (
        <LargeBox>
          <div className="text">
            {`菜鳥！恭喜你成為六角學院的正式員工啦！
          在正式加入專案開發之前，
          需要請你先了解 Scrum 的流程與精神！ 

          成功通過 Scrum 新手村的試煉吧！
          `}
          </div>
          <div className="btn" onClick={() => handleClick()}>
            <StartButton content="開始試煉">
              <img
                alt=""
                src="./images/arrow.png"
                style={{ marginLeft: "5px" }}
              />
            </StartButton>
          </div>
        </LargeBox>
      ) : (
        <SmallBox>
          <Dot />
          <Dot />
          <Dot />
        </SmallBox>
      )}
      <NamedWorker2></NamedWorker2>
    </div>
  );
}
