import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { NormalDialog, ChatFrame } from "../components/ChatFrame";
import { NamedWorker } from "../components/Workers";
import { StartButton } from "../components/Buttons";
import { useUser } from "../contexts/UserContext";
import { Mark } from "../utils";
import { DropBox } from "../components/DropBox";

export default function Stage1Page() {
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
  const answerAry = ["1", "2", "3", "4"];
  const [isOrderCorret, setIsOrderCorret] = useState(null);
  const [progress, setProgress] = useState(2);
  const { user } = useUser();

  const handleStart = () => {
    setProgress(2);
  };

  return (
    <StageWrapper className="stage1__container">
      {(() => {
        switch (progress) {
          case 1:
            return (
              <>
                <DialogBox>
                  <div className="text">{textContent(user.name)}</div>
                  <div className="btn" onClick={() => handleStart()}>
                    <StartButton content="開始試煉" />
                  </div>
                </DialogBox>
                <NamedWorker worker={"小敏"} onStage={true}></NamedWorker>
              </>
            );
          case 2:
            return (
              <>
                <LongHintBar>
                  請把需求放到產品待辦清單，並調整待辦的優先度順序。公司也推薦使用
                  <img
                    src="./images/jira_logo.png"
                    alt="Jira"
                    style={{ margin: "0 8px" }}
                  />
                  來做任務的管理喔！
                </LongHintBar>
                <GameBox>
                  <div style={{ fontWeight: 700 }}>
                    產品待辦清單 ProductBacklog
                  </div>
                  <GameHintText>優先度高↑</GameHintText>
                  <DropBox
                    itemObj={itemObj}
                    setItemObj={setItemObj}
                    setIsOrderCorret={setIsOrderCorret}
                    answerAry={answerAry}
                  />
                  <GameHintText>優先度低↓</GameHintText>
                </GameBox>
              </>
            );
          default:
            return;
        }
      })()}
    </StageWrapper>
  );
}

const GameHintText = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.mid_grey};
`;

const GameBox = styled(ChatFrame)`
  padding: 30px 100px;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  width: 688px;
  height: 874px;
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

const DialogBox = styled(NormalDialog)`
  width: 1084px;
`;
const LongHintBar = styled(ChatFrame)`
  position: relative;

  padding: 40px 137px 40px 140px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 24px;

  margin-top: 40px;
`;

const textContent = (name) => (
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
