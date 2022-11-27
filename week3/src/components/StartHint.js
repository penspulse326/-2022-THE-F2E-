import { useState, useEffect, useRef } from "react";
import { Loading, NormalDialog } from "./ChatFrame";
import { namedWorker } from "./Workers";
import { StartButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../utils";

export default function StartHint() {
  const [logState, setLogState] = useState(false);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logState) {
      setTimeout(() => setLogState(true), 1000);
    }
    return () => setLogState(false);
  }, []);

  const handleClick = () => {
    pageTransition("body", navigate, "/createAvatar");
  };

  return (
    <div className="home__container" ref={pageRef}>
      {logState ? (
        <NormalDialog>
          <div className="text">{textContent}</div>
          <div className="btn" onClick={() => handleClick()}>
            <StartButton content="開始試煉" />
          </div>
        </NormalDialog>
      ) : (
        <Loading />
      )}
      {namedWorker("小敏", false)}
    </div>
  );
}

const textContent = (
  <>
    菜鳥！恭喜你成為六角學院的正式員工啦！
    <br />
    在正式加入專案開發之前，
    <br />
    需要請你先了解 Scrum 的流程與精神！
    <br />
    <br />
    成功通過 Scrum 新手村的試煉吧！
    <br />
    <br />
  </>
);
