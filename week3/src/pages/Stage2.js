import { useState } from "react";
import styled from "styled-components";
import { NormalDialog } from "../components/ChatFrame";
import { NamedWorker } from "../components/Workers";
import { StartButton, GreyButton } from "../components/Buttons";
import { Mark } from "../utils";
import { pageTransition } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Stage2() {
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  const handleStart = () => {};

  return (
    <StageWrapper className="stage1">
      {progress === 1 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[progress - 1]}</div>
            <div onClick={() => setProgress((state) => state + 1)}>
              <GreyButton content="繼續" />
            </div>
          </NormalDialog>
          <NamedWorker number={2} name={"小敏"}></NamedWorker>
        </>
      )}
      {progress === 2 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[progress - 1]}</div>
            <div onClick={() => setProgress((state) => state + 1)}>
              <GreyButton content="繼續" />
            </div>
          </NormalDialog>
          <NamedWorker number={4} name={"小捷"}></NamedWorker>
        </>
      )}
      {progress === 3 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[progress - 1]}</div>
            <div onClick={() => setProgress((state) => state + 1)}>
              <GreyButton content="繼續" />
            </div>
          </NormalDialog>
          <NamedWorker number={4} name={"小捷"}></NamedWorker>
          <NamedWorker number={3} name={"小凱"} left={"550px"}></NamedWorker>
          <NamedWorker
            number={1}
            name={"小斯"}
            left={"300px"}
            tag={"left"}
            tagTop={"190px"}
            bottom={"-170px"}
          ></NamedWorker>
        </>
      )}
      {progress === 4 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[progress - 1]}</div>
            <div onClick={() => setProgress((state) => state + 1)}>
              <GreyButton content="繼續" />
            </div>
          </NormalDialog>
          <NamedWorker
            number={1}
            name={"小斯"}
            tagTop={"190px"}
            bottom={"-170px"}
          ></NamedWorker>
        </>
      )}
      {progress === 5 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text[progress - 1]}</div>
            <div onClick={() => setProgress((state) => state + 1)}>
              <StartButton content="開始試煉" />
            </div>
          </NormalDialog>
          <NamedWorker number={3} name={"小凱"}></NamedWorker>
        </>
      )}
    </StageWrapper>
  );
}

const GameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const text = [
  <>
    產品待辦清單好了之後，
    <br />
    我們來召集 Scrum Master 和開發團隊
    <br />
    共同召開{Mark("短衝規劃會議（Sprint Planning）")}。<br />
    短衝即是一個迭代，具有固定時間限制，我們會在這個會議中，決定要完成哪些工作事項來達到商業需求，
    <br />
    <br />
    {Mark("列出短衝待辦清單（Sprint Backlog）")}
    ，並由開發團隊在接下來的產品開發週期裡執行。
    <br />
    <br />
  </>,
  <>
    嗨嗨！你是新來的前端吧！
    <br />
    我是這次的 Scrum Master 小捷，
    <br />
    我的工作主要是促成開發團隊成員協作、引導團隊進行自省會議，提升團隊成員對
    Scrum 瞭解。
    <br />
    <br />
  </>,
  <>
    這兩位是小斯和小廣，是我們開發團為的成員唷～ 目前我們團隊一次 Sprint
    週期是兩週的時間，依照我的觀察，目前團隊可以負擔的點數 (Sprint Point) 大約是
    20 點左右。
    <br />
    <br />
  </>,
  <>
    菜鳥，你應該不知道點數是什麼意思吧哈哈！
    <br />
    我來跟你介紹一下吧～
    <br />
    Sprint Point 目的是為了衡量速度，是用大概花費的時間預估出的相對點數。
    <br />
    <br />
  </>,
  <>
    沒錯，如同小斯說的，我這邊已經把剛剛討論好的點數標上去囉～你來練習把任務排到短衝待辦清單吧！
    <br />
    By the way，我們平常管理任務是使用
    <a
      href="https://www.atlassian.com/software/jira"
      style={{ verticalAlign: "middle" }}
    >
      <img
        src="./images/jira_logo.png"
        alt="Jira"
        style={{ margin: "0 7px" }}
      />
    </a>
    這套軟體，你有時間記得先去註冊和熟悉唷～
    <br />
    <br />
  </>,
];
