import { useState, useEffect, useRef } from "react";
import { Loading, NormalDialog } from "../components/ChatFrame";
import { NamedWorker } from "../components/Workers";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../utils";
import { StartButton } from "../components/Buttons";

export default function GameStart() {
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleClick = () => {
    pageTransition("body", navigate, "/createAvatar");
  };

  return (
    <div className="home__container" ref={pageRef}>
      {isLoading ? (
        <Loading />
      ) : (
        <NormalDialog size="M">
          <div className="text">{text}</div>
          <div onClick={() => handleClick()}>
            <StartButton content="開始試煉" />
          </div>
        </NormalDialog>
      )}
      <NamedWorker number={2} name={"？？？"}></NamedWorker>
    </div>
  );
}

const text = (
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
