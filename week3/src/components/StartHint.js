import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NormalDialog } from "./ChatFrame";
import { NamedWorker2 } from "./Workers";
import { StartButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../utils";

const SmallBox = styled(NormalDialog)`
  padding: 0;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 122px;
  width: 353px;
`;

const Dot = styled.div`
  height: 11px;
  width: 11px;
  border-radius: 100%;
  background: ${(props) => props.theme.colors.mid_grey};
  margin: 0 9px;
`;

export default function StartHint() {
  const [logState, setLogState] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    if (!logState) {
      setTimeout(() => setLogState(true), 1000)
        ;
    }
    return () => setLogState(false);
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    pageTransition("body", navigate, "/createAvatar");
  };

  return (
    <div className="home__container" ref={pageRef}>
      {logState ? (
        <NormalDialog>
          <div className="text">
            {textContent}
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
        </NormalDialog>
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

const textContent = `菜鳥！恭喜你成為六角學院的正式員工啦！
在正式加入專案開發之前，
需要請你先了解 Scrum 的流程與精神！ 

成功通過 Scrum 新手村的試煉吧！

`