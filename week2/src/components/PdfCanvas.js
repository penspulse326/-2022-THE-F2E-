import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
import styled from "styled-components";

const PRINT_RATE = 120.0 / 72.0;

const Canvas = styled.canvas`
  box-shadow: 1px 1px 5px 1px #ccc;
`;

function PageCanvas({ page, id, setFabricPages, activePage, scale }) {
  // 用 useRef 抓取此頁面下的 canvas
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    fabricRef.current?.dispose();
    createViewer();
  }, [page, scale]);

  async function createViewer() {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricRef.current = canvas;
    canvas.requestRenderAll();
    const pdfData = await printPDF(page);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    canvas.setWidth(pdfImage.width / window.devicePixelRatio);
    canvas.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景 並存進 state
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    setFabricPages((state) => {
      let arr = [...state];
      arr[id] = canvas;
      return arr;
    });
  }

  async function printPDF(page) {
    // 設定尺寸及產生 canvas
    const viewport = page.getViewport({
      scale: window.devicePixelRatio * scale,
    });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height * PRINT_RATE;
    canvas.width = viewport.width * PRINT_RATE;
    const renderContext = {
      canvasContext: context,
      viewport,
      transform: [PRINT_RATE, 0, 0, PRINT_RATE, 0, 0],
    };
    const renderTask = page.render(renderContext);

    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas);
  }

  async function pdfToImage(pdfData) {
    // 設定 PDF 轉為圖片時的比例
    const scale = 1 / window.devicePixelRatio;

    // 回傳圖片
    return new fabric.Image(pdfData, {
      id: "renderPDF",
      scaleX: scale,
      scaleY: scale,
    });
  }

  const handleSign = () => {
    const img = localStorage.getItem("img");
    if (img) {
      fabric.Image.fromURL(img, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 30;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        fabricRef.current.add(image);
      });
    }
  };

  const style = {
    display: activePage === id ? "block" : "none",
  };

  return (
    <div style={style}>
      <Canvas ref={canvasRef} />
      <button onClick={() => handleSign()}>新增簽名</button>
    </div>
  );
}

function PageContainer({ pages, activePage }) {
  // 存 fabaric 生成的 canvas 之後輸出 PDF 要使用
  const [fabricPages, setFabricPages] = useState([]);
  // 縮放倍率
  const [scale, setScale] = useState(0.5);

  const savePDF = () => {
    if (fabricPages.length > 0) {
      // jsPDF 實例化必定會有第一頁的空白頁 因此先對該頁進行設定
      const pdf = new jsPDF({
        orientation: fabricPages[0].height > fabricPages[0].width ? "p" : "l",
        unit: "px",
        userUnit: 72,
      });

      fabricPages.forEach((page, i) => {
        // 將 canvas 存為圖片
        const image = page.toDataURL({
          format: "jpeg",
          quality: 1,
        });

        // 設定背景在 PDF 中的位置及大小
        const width = Math.min(
          page.width / PRINT_RATE,
          pdf.internal.pageSize.width
        );
        const height = Math.min(
          page.height / PRINT_RATE,
          pdf.internal.pageSize.height
        );

        pdf.addImage(image, "png", 0, 0, width, height);
        // 設定下一頁的大小
        if (i < pages.length - 1) pdf.addPage();
      });

      pdf.save("your_pdf");
    } else {
      alert("請上傳好檔案再進行儲存");
    }
  };

  const handleScale = (zoom) => {
    if (zoom === "+") {
      setScale(scale + 0.125);
    }
    if (zoom === "-" && scale > 0.5) {
      setScale(scale - 0.125);
    }
  };

  return (
    <>
      {pages?.map((item, index) => (
        <PageCanvas
          key={index}
          id={index}
          page={item}
          setFabricPages={setFabricPages}
          activePage={activePage}
          scale={scale}
        />
      ))}
      <button onClick={() => savePDF()}>存檔</button>
      <Zoom>
        <button onClick={() => handleScale("+")}>+</button>
        <button onClick={() => handleScale("-")}>-</button>
      </Zoom>
    </>
  );
}

export default function PDFCanvas({ pages, activePage }) {
  return (
    <PageWrapper className="page__wrapper">
      <PageContainer pages={pages} activePage={activePage} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 50px 30px;
  width: 100%;
`;

const Zoom = styled.div`
  position: fixed;
  bottom: 50px;

  width: 500px;
  height: 50px;

  background-color: grey;
  opacity: 0.3;
  transition: 0.3s;

  button {
    width: 100px;
    height: 100%;
  }

  &:hover {
    opacity: 1;
  }
`;
