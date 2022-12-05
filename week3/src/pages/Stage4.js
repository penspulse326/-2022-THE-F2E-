import { useState, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { NormalDialog, LongHintBar, ChatFrame } from "../components/ChatFrame";
import { NamedWorker, Worker3 } from "../components/Workers";
import {
  StartButton,
  GreyButton,
  DialogBack,
  ConfirmButton,
} from "../components/Buttons";
import { Mark } from "../utils";
import MaskHint from "../components/MaskHint";
import { pageTransition } from "../utils";
import { useNavigate } from "react-router-dom";
import { Stage3DropBox } from "../components/Stage3DropBox";

export default function Stage4() {
  // game data
  const [answer, setAnswer] = useState({ Q1: null, Q2: null });
  const [isAnswerOK, setIsAnswerOK] = useState(null);

  // dom state
  const [progress, setProgress] = useState(1);
  const [mask, setMask] = useState(0);
  const [isMask, setIsMask] = useState(false);
  const navigate = useNavigate();

  // run animation and check game state
  useEffect(() => {
    if (progress === 2) {
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
        .from(".npc3", {
          y: -300,
          duration: 0.5,
          ease: "expo",
        });
    }
  }, [progress]);

  useEffect(() => {
    if (isMask === false && mask === 2)
      pageTransition("body", navigate, "../final");
  }, [isMask]);

  const handleBack = () => {
    if (progress > 1) setProgress(progress - 1);
  };

  const handleOptionClick = (question, num) => {
    setAnswer((state) => ({
      ...state,
      [question]: num,
    }));
  };

  const checkAnswer = () => {
    setIsMask(true);
    const finalAns = answer.Q1 === 2 && answer.Q2 === 1;
    if (finalAns) setMask(2);
    else setMask(1);
    setIsAnswerOK(finalAns);
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
            <NamedWorker
              number={3}
              name={"小廣"}
              bottom={"-180px"}
            ></NamedWorker>
          </>
        )}
        {progress > 1 && <DialogBack onClick={() => handleBack()} />}
      </>
      {progress === 2 && (
        <>
          <InlineWorker className="npc3"></InlineWorker>
          <GameWrapper className="gamebox">
            <LongHintBar>
              重點在於「正面表述」，你也思考看看， 哪一些是適合 Retro 的回饋吧！
            </LongHintBar>
            <Section>
              <OptionWrapper>
                做得好的地方
                <>
                  <OptionBox
                    content={"這次我幫了很多人救火耶 ^_^"}
                    active={answer.Q1 === 1}
                    toggle={handleOptionClick}
                    index={["Q1", 1]}
                  />
                  <OptionBox
                    content={
                      "大家在開發上都會互相 cover，讓任務都有準在時間內完成。"
                    }
                    active={answer.Q1 === 2}
                    toggle={handleOptionClick}
                    index={["Q1", 2]}
                  />
                </>
              </OptionWrapper>
              <OptionWrapper>
                有哪些可以做得更好？
                <>
                  <OptionBox
                    content={
                      "可以記錄這次的開發時間，讓預估團隊點數可以更精準。"
                    }
                    active={answer.Q2 === 1}
                    toggle={handleOptionClick}
                    index={["Q2", 1]}
                  />
                  <OptionBox
                    content={
                      "開發時間預估不準確，請後端下次改進，避免 delay 到我：）"
                    }
                    active={answer.Q2 === 2}
                    toggle={handleOptionClick}
                    index={["Q2", 2]}
                  />
                </>
              </OptionWrapper>
              <Confirm content="我完成了！" onClick={() => checkAnswer()} />
            </Section>
          </GameWrapper>
        </>
      )}
      {isMask &&
        (mask === 1 ? (
          <MaskHint
            name={"小廣"}
            number={3}
            content={`......好哦，請再試一次吧～
            `}
            btnText={"好的"}
            toggle={setIsMask}
          />
        ) : (
          <MaskHint
            name={"小廣"}
            number={3}
            content={`你也是語言的藝術家了～～
            `}
            btnText={"謝謝"}
            toggle={setIsMask}
          />
        ))}
    </StageWrapper>
  );
}

const InlineWorker = styled(Worker3)`
  position: absolute;
  transform: scale(0.28);
  top: -250px;
  left: 1425px;
  z-index: 99;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled(ChatFrame)`
  position: relative;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 20px 10px;
  padding: 50px 150px;
  width: 1320px;
  height: 900px;

  font-weight: 700;
`;

const OptionWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const OptionCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 35px;
  width: 38px;
  height: 38px;
  background-color: white;
  border: 3px solid ${(props) => props.theme.colors.dark_grey};
  border-radius: 50%;
`;

const CheckDot = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 50%;
  background-color: ${(props) => props.active && props.theme.colors.primary};
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;

  height: 76px;
  width: 995px;

  background-color: ${(props) => props.active && "rgba(255, 172, 137, 0.3)"};

  border: 2px ${(props) => (props.active ? "solid" : "dashed")} #8e7e74;
  border-radius: 82px;

  font-weight: 500;

  &:hover {
    transition: 0.3s;
    background-color: ${(props) =>
      !props.active && props.theme.colors.mid_grey};

    div div {
      background-color: ${(props) =>
        !props.active && props.theme.colors.mid_grey};
    }
  }

  box-sizing: border-box;
`;
const OptionBox = ({ content, active, toggle, index }) => {
  return (
    <Option active={active} onClick={() => toggle(index[0], index[1])}>
      <OptionCheck>
        <CheckDot active={active}></CheckDot>
      </OptionCheck>
      {content}
    </Option>
  );
};

const StageWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Confirm = styled(ConfirmButton)`
  margin-top: 30px;
  height: 80px;

  border-radius: 25px;
  font-size: 28px;
  cursor: pointer;

  align-self: center;

  z-index: 99;
`;

const text = [
  <>
    哇賽新來的，你真的很幸運，
    <br />
    今天剛好是開發 B 組的 {Mark("Retro")} ，你也來見識一下，看看 Retro
    都該做些什麼吧～～ <br />
    <br />
    我們會在會議裡請團隊成員提出哪些是做得好的地方、哪些可以繼續改善的地方？並記錄在
    <a href="https://www.atlassian.com/software/confluence">
      <img
        src="./images/confluence_logo.png"
        alt="Jira"
        style={{ margin: "0 7px" }}
      />
    </a>
    中。
    <br /> Retro 重點在於 {Mark("「正面表述」")} ，你也思考看看，哪一些是適合
    Retro 的回饋吧～～
    <br />
    <br />
  </>,
];
