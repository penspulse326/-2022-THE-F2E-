import { useEffect, useRef, useState } from "react";

export function SignCanvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 300;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.shadowBlur = 1;
    context.shadowColor = "black";
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
    document.querySelector(".show-img").src = newImg;
    localStorage.setItem("img", newImg);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #000" }}
        onMouseDown={startPosition}
        onMouseMove={draw}
        onMouseUp={finishedPosition}
        onTouchStart={startPosition}
        onTouchMove={draw}
        onTouchEnd={finishedPosition}
      />
      <img
        className="show-img"
        width="250"
        height="150"
        style={{ border: "1px solid #000" }}
      />
      <div className="btn-group">
        <button className="clear" onClick={() => reset()}>
          Clear
        </button>
        <button className="save" onClick={() => saveImage()}>
          Save
        </button>
      </div>
    </div>
  );
}
