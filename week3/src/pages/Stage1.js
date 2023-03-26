import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { NormalDialog, LongHintBar } from "../components/ChatFrame";
import { NamedWorker } from "../components/Workers";
import { StartButton } from "../components/Buttons";
import { useUser } from "../contexts/UserContext";
import { Mark, pageTransition } from "../utils";
import MaskHint from "../components/MaskHint";
import { Stage1DropBox } from "../components/Stage1DropBox";

export default function Stage1() {
  // data for draggable items
  const [itemObj, setItemObj] = useState({
    outer: {
      items: [
        {
          content: "前台職缺列表（職缺詳細內容、點選可發送應徵意願）",
          id: nanoid(),
          priority: "3",
        },
        { content: "應徵者的線上履歷編輯器", id: nanoid(), priority: "2" },
        {
          content: "會員系統（登入、註冊、權限管理）",
          id: nanoid(),
          priority: "1",
        },
        {
          content: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
          id: nanoid(),
          priority: "4",
        },
      ],
    },
    inner: {
      items: [],
    },
  });
  // order answer(by priority)
  const answerAry = ["1", "2", "3", "4"];
  const [isOrderCorret, setIsOrderCorret] = useState(null);

  // mask hint number, 1 is answer incorrect, 2 is correct
  const [mask, setMask] = useState(0);
  const [isMask, setIsMask] = useState(false);

  // switch content by this state
  const [progress, setProgress] = useState(1);

  // user data from context
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (mask === 2 && isMask === false)
      pageTransition("body", navigate, "../stage2");
  }, [mask, isMask]);

  const handleStart = () => setProgress(2);

  const handleCheck = () => {
    setIsMask(true);
    if (isOrderCorret) setMask(2);
    else setMask(1);
  };

  return (
    <StageWrapper>
      {progress === 1 && (
        <>
          <NormalDialog size="L">
            <div className="text">{text(user.name)}</div>
            <div onClick={() => handleStart()}>
              <StartButton content="開始試煉" />
            </div>
          </NormalDialog>
          <NamedWorker number={2} name={"小敏"}></NamedWorker>
        </>
      )}
      {progress === 2 && (
        <>
          <LongHintBar>
            <>
              請把需求放到產品待辦清單，並調整待辦的優先度順序。公司也推薦使用
            </>
            <a href="https://www.atlassian.com/software/jira">
              <img src="./images/jira_logo.png" alt="Jira" />
            </a>
            來做任務的管理喔！
          </LongHintBar>
          <GameWrapper>
            <Stage1DropBox
              itemObj={itemObj}
              setItemObj={setItemObj}
              answerAry={answerAry}
              setIsOrderCorret={setIsOrderCorret}
              handleCheck={handleCheck}
            />
          </GameWrapper>
        </>
      )}
      {isMask &&
        (mask === 1 ? (
          <MaskHint
            name={"小敏"}
            content={`嘿！菜鳥！
              想跑去哪呢？你的試煉還沒有完成呢！
            `}
            btnText={"謝謝"}
            toggle={setIsMask}
          />
        ) : (
          <MaskHint
            name={"小敏"}
            content={"做得好啊！菜鳥！"}
            btnText={"謝謝"}
            toggle={setIsMask}
          />
        ))}
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

const text = (name) => (
  <>
    哈囉~{name}。
    <br />
    我是開發 A 組的 PO，小敏。
    <br />
    <br />
    PO也就是{Mark("產品負責人(Product Owner)")}。<br />
    產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序，對齊產品目標。最後排出產品待辦清單(Product
    Backlog)唷！
    <br />
    <br />
    剛好我最近手邊有一個『人才招募系統』的案子，我才剛列出了『產品需求清單』。既然你都來了，
    {Mark("來試試看調整產品優先度，排出產品待辦清單吧！")}
    <br />
    <br />
  </>
);
