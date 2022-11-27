import { useEffect, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { NormalDialog, ChatFrame } from "../components/ChatFrame";
import { namedWorker } from "../components/Workers";
import { StartButton, ConfirmButton, GreyButton } from "../components/Buttons";
import { useUser } from "../contexts/UserContext";
import { Mark } from "../utils";
import { DropBox } from "../components/DropBox";
import { Slot } from "../components/Card";
import MaskHint from "../components/MaskHint";
import { pageTransition } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Stage2Page() {
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
  const [mask, setMask] = useState(0);
  const [isMask, setIsMask] = useState(false);
  const [progress, setProgress] = useState(1);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (mask === 2 && !isMask)
      pageTransition("body", navigate, "/createAvatar");
  }, [mask, isMask]);

  const handleNextDialog = () => {
    setProgress((state) => {
      console.log(state);
      return state + 1;
    });
  };

  const handleCheck = () => {
    setIsMask(true);
    if (isOrderCorret) {
      setMask(2);
    } else {
      setMask(1);
    }
  };

  return (
    <StageWrapper className="stage1__container">
      {progress < 6 && (
        <DialogBox>
          <div className="text">{textContent[progress - 1]}</div>
          <div className="btn" onClick={() => handleNextDialog()}>
            <GreyButton content="繼續" />
          </div>
        </DialogBox>
      )}
      {progress === 1 && namedWorker("小敏", true)}
      {progress === 2 && namedWorker("小捷", true)}
      {progress === 3 && <>{namedWorker("小捷", true)}</>}
      {progress === 4 && namedWorker("小斯", true)}
      {progress === 5 && namedWorker("小凱", true)}
      {isMask && (
        <MaskHint
          worker={"小敏"}
          btnText={mask === 1 ? "好的" : "謝謝"}
          onStage={true}
          method={setIsMask}
          content={
            mask === 1
              ? `嘿！菜鳥！
          想跑去哪呢？你的試煉還沒有完成
          `
              : `做得好啊！菜鳥！`
          }
        />
      )}
    </StageWrapper>
  );
}

const SlotWrapper = styled.div`
  margin-top: 20px;
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameHintText = styled.div`
  margin-bottom: 10px;
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
  margin-top: 50px;
  width: 1084px;
`;
const LongHintBar = styled(ChatFrame)`
  position: relative;

  padding: 20px 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 24px;

  margin-top: 40px;
`;

const Confirm = styled(ConfirmButton)`
  position: absolute;
  top: 620px;
  height: 72px;
  margin-top: 20px;
  font-size: 28px;
  border-radius: 25px;
  z-index: 99;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const textContent = [
  <>
    產品待辦清單好了之後， <br />
    我們來召集 Scrum Master <br />
    共同召開{Mark("短衝規劃會議（Sprint Planning）")}。<br />
    短衝即是一個迭代，具有固定時間限制，我們會在這個會議中，決定要完成哪些工作事項來達到商業需求。
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
  </>,
  <>
    菜鳥，你應該不知道點數是什麼意思吧哈哈！ 我來跟你介紹一下吧～
    <br /> Sprint Point 目的是為了衡量速度，是用大概花費的時間預估出的相對點數。
  </>,
  <>
    沒錯，如同小斯說的，我這邊已經把剛剛討論好的點數標上去囉～你來練習把任務排到短衝待辦清單吧！
    <br />
    By the way，我們平常管理任務是使用
    <img
      src="./images/jira_logo.png"
      alt="Jira"
      style={{ margin: "0px 8px", lineHeight: "50px" }}
    />
    這套軟體，你有時間記得先去註冊和熟悉唷～
    <br /> <br />
  </>,
];
