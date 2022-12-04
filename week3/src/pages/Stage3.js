import { useState, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { nanoid } from "nanoid";
import { NormalDialog, LongHintBar } from "../components/ChatFrame";
import { NamedWorker, Worker1 } from "../components/Workers";
import { StartButton, GreyButton, DialogBack } from "../components/Buttons";
import { Mark } from "../utils";
import MaskHint from "../components/MaskHint";
import { pageTransition } from "../utils";
import { useNavigate } from "react-router-dom";
import { Stage3DropBox } from "../components/Stage3DropBox";

export default function Stage3() {
  // game data
  const [itemObj, setItemObj] = useState({
    outer: {
      items: [
        {
          content: "短衝檢視會議 Sprint Review",
          id: nanoid(),
          priority: 2,
        },
        {
          content: "短衝自省會議 Sprint Retrospective",
          id: nanoid(),
          priority: 3,
        },
        {
          content: "每日站立會議(Daily Scrum)",
          id: nanoid(),
          priority: 1,
        },
      ],
    },
    scrum1: {
      item: null,
    },
    scrum2: {
      item: null,
    },
    scrum3: {
      item: null,
    },
  });
  const [isProrityOK, setIsProrityOK] = useState(null);

  // dom state
  const [progress, setProgress] = useState(1);
  const [mask, setMask] = useState(0);
  const [isMask, setIsMask] = useState(false);
  const navigate = useNavigate();

  // run animation and check game state
  useEffect(() => {
    if (progress === 6) {
      gsap
        .timeline()
        .from(".gamebox", {
          yPercent: 100,
          duration: 2,
          ease: "power1",
        })
        .to(".gamebox", {
          clearProps: true,
        })
        .from(".npc1", {
          y: -300,
          duration: 0.5,
          ease: "expo",
        });
    }
  }, [progress]);

  useEffect(() => {
    if (isMask === false && mask === 2)
      pageTransition("body", navigate, "../stage4");
  }, [isMask]);

  const handleStart = () => {
    setProgress(6);
  };
  const handleBack = () => {
    if (progress > 1) setProgress(progress - 1);
  };

  const handleCheck = () => {
    setIsMask(true);
    if (isProrityOK) setMask(2);
    else setMask(1);
  };

  return (
    <StageWrapper className="stage1">
      <>
        {progress === 1 && (
          <>
            <NormalDialog size="L">
              <div className="text">{text[progress - 1]}</div>
              <div onClick={() => setProgress((state) => state + 1)}>
                <GreyButton content="繼續" />
              </div>
            </NormalDialog>
            <NamedWorker number={1} name={"小斯"}></NamedWorker>
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
            <NamedWorker number={1} name={"小斯"}></NamedWorker>
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
            <NamedWorker number={1} name={"小斯"}></NamedWorker>
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
            <NamedWorker number={1} name={"小斯"}></NamedWorker>
          </>
        )}
        {progress === 5 && (
          <>
            <NormalDialog size="L">
              <div className="text">{text[progress - 1]}</div>
              <div onClick={() => handleStart()}>
                <StartButton content="開始試煉" />
              </div>
            </NormalDialog>
            <NamedWorker number={1} name={"小斯"}></NamedWorker>
          </>
        )}
        {progress > 1 && <DialogBack onClick={() => handleBack()} />}
      </>
      {progress === 6 && (
        <>
          <InlineWorker className="npc1"></InlineWorker>
          <GameWrapper className="gamebox">
            <LongHintBar>
              在這經典的 Scrum 流程圖中，
              這些流程分別代表哪一個會議呢？請把對應的流程拖曳到正確位置。
            </LongHintBar>
            <Stage3DropBox
              itemObj={itemObj}
              setItemObj={setItemObj}
              setIsProrityOK={setIsProrityOK}
              handleCheck={handleCheck}
            />
          </GameWrapper>
        </>
      )}
      {isMask &&
        (mask === 1 ? (
          <MaskHint
            name={"小斯"}
            number={1}
            content={`加把勁啊新人！
            `}
            btnText={"好的"}
            toggle={setIsMask}
          />
        ) : (
          <MaskHint
            name={"小斯"}
            number={1}
            content={`這麼快就對Scrum瞭若指掌了，
            我對你刮目相看了哦！`}
            btnText={"謝謝"}
            toggle={setIsMask}
          />
        ))}
    </StageWrapper>
  );
}

const InlineWorker = styled(Worker1)`
  position: absolute;
  transform: scale(0.28);
  top: -250px;
  left: 1410px;
  z-index: 99;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    等等等等等，你都還不知道什麼是{Mark("Sprint")} 吧！
    <br />
    讓我先為你介紹一下～ 仔細聽好唷，等等會考考你！
    <br />
    <br />
  </>,
  <>
    {Mark("Sprint 是一個短衝")} ， 開發團隊會在這期間執行開發。
    <br />
    在這段期間內，開發團隊舉辦{Mark("每日站立會議 Daily Scrum")}
    ，追蹤成員間的工作狀況。
    <br />
    <br />
    除了每日站立會議，在 Sprint 結束後也會有：
    <br />
    {Mark("短衝檢視會議 SprintReview")}、
    <br />
    {Mark("短衝自省會議 Sprint Retrospective")}。
    <br />
    <br />
  </>,
  <>
    {Mark("每日站立會議 Daily Scrum")}
    每天都要進行的會議，以 15 分鐘為限制
    <br />
    ．昨天為團隊的短衝目標（Sprint Goal）做了那些進度
    <br />
    ．今天我會如何準備來幫助團隊達到短衝目標
    <br />
    ．過程中有遇到什麼問題、難題
    <br />
    <br />
    透過團隊分享，追蹤大家的工作狀況。
    <br />
    <br />
  </>,
  <>
    {Mark("短衝檢視會議 Sprint Review")}
    <br />
    <br />
    用來檢視該次短衝增量的成果，
    <br />
    以蒐集相關的回饋數據或意見。
    <br />
    <br />
  </>,
  <>
    {Mark("短衝自省會議 Sprint Retrospective")}
    <br />
    <br />
    團隊在自省會議裡，
    <br />
    會共同回顧該短衝歷程發生的事情：
    <br />
    ・好的地方
    <br />
    ・可以改進的地方
    <br />
    ・如何維持我們已有的成功經驗
    <br />
    <br />
    優化工作流程、讓團隊有變得更好的機會。
    <br />
    推薦工具：Confluence
    <br />
    <br />
  </>,
];
