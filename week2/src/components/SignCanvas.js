import { useEffect, useRef, useState } from "react";
import { DarkBtn, LightBtn } from "../components/Button";
import styled from "styled-components";
import { MQ_MD } from "../constants/breakpoint";

const textColor = {
  black: "#000000",
  green: "#458227",
  red: "#EC0303",
  blue: "#0073E6",
};

export function SignCanvas({ setIsMask, setSigns }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 750;
    canvas.height = 140;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = textColor.black;
    context.shadowBlur = 1;
    context.shadowColor = textColor.black;
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  // 取得滑鼠 / 手指在畫布上的位置
  function getPaintPosition(e) {
    const canvasSize = canvasRef.current.getBoundingClientRect();

    if (e.type === "mousemove") {
      return {
        x: e.clientX - canvasSize.left,
        y: e.clientY - canvasSize.top,
      };
    } else {
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    }
  }

  // 開始繪圖時，將狀態開啟
  function startPosition(e) {
    setIsPainting(true);
  }

  // 結束繪圖時，將狀態關閉，並產生新路徑
  function finishedPosition() {
    setIsPainting(false);
    contextRef.current.beginPath();
  }

  // 繪圖過程
  function draw(e) {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting) return;

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e);

    // 移動滑鼠位置並產生圖案
    contextRef.current.lineTo(paintPosition.x, paintPosition.y);
    contextRef.current.stroke();
  }

  // 重新設定畫布
  function reset() {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }

  const saveImage = () => {
    const newImg = canvasRef.current.toDataURL("image/png");
    setSigns((state) => [...state, newImg]);
    setIsMask(false);
  };

  const changeColor = (color) => {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.shadowColor = color;
  };

  return (
    <>
      <ColorSelect>
        <BlackStroke onClick={() => changeColor(textColor.black)} />
        <RedStroke onClick={() => changeColor(textColor.red)} />
        <GreenStroke onClick={() => changeColor(textColor.green)} />
        <BlueStroke onClick={() => changeColor(textColor.blue)} />
      </ColorSelect>
      <SignWrapper>
        <canvas
          ref={canvasRef}
          onMouseDown={startPosition}
          onMouseMove={draw}
          onMouseUp={finishedPosition}
          onTouchStart={startPosition}
          onTouchMove={draw}
          onTouchEnd={finishedPosition}
        />
        <hr />
        <div>
          <a href="" onClick={() => reset()}>
            清除
          </a>
        </div>
      </SignWrapper>
      <BtnWrapper>
        <CancelBtn onClick={() => setIsMask(false)}>取消</CancelBtn>
        <CreateBtn onClick={() => saveImage()}>建立</CreateBtn>
      </BtnWrapper>
    </>
  );
}

const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: auto;

  background-color: ${(props) => props.theme.mid_grey};
  box-sizing: border-box;

  div {
    align-self: flex-end;
    padding: 10px 30px;
  }

  a {
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
  }

  hr {
    width: 90%;
    border: 1px solid ${(props) => props.theme.dark_grey};
  }
`;

const ColorSelect = styled.div`
  display: flex;
  align-self: flex-start;
  padding: 10px 0;
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.dark_grey};
  border-radius: 5px;
`;

const BlackStroke = styled.div`
  margin: 0 10px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.text.black};
  border-radius: 50%;

  cursor: pointer;
`;

const GreenStroke = styled(BlackStroke)`
  background-color: ${({ theme }) => theme.text.green};
`;

const RedStroke = styled(BlackStroke)`
  background-color: ${({ theme }) => theme.text.red};
`;

const BlueStroke = styled(BlackStroke)`
  background-color: ${({ theme }) => theme.text.blue};
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 20px;
  width: 100%;
`;

const CancelBtn = styled(LightBtn)`
  padding: 10px;
  width: 80px;

  ${MQ_MD} {
    padding: 0px;
    width: 100px;
    height: 60px;
    font-size: 20px;
  }
`;

const CreateBtn = styled(DarkBtn)`
  margin-left: 10px;
  padding: 10px;
  width: 80px;

  ${MQ_MD} {
    padding: 0px;
    width: 100px;
    height: 60px;
    font-size: 20px;
  }
`;
