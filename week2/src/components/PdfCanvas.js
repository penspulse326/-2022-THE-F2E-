import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
import styled from "styled-components";
import { UseSignContext } from "../SignContext";
import {
  RxCursorArrow,
  RxHand,
  RxZoomIn,
  RxZoomOut,
  RxWidth,
} from "react-icons/rx";

const PRINT_RATE = 120.0 / 72.0;

const Canvas = styled.canvas`
  box-shadow: 1px 1px 5px 1px #ccc;
`;

function PageCanvas({ page, id, setFabricPages, activePage }) {
  // 用 useRef 抓取此頁面下的 canvas
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  const { selectedSign, setSelectedSign } = UseSignContext();

  useEffect(() => {
    fabricRef.current?.dispose();
    setTimeout(() => {
      createViewer();
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedSign && id === activePage) {
      handleSign();
    }
  }, [selectedSign]);

  async function printPDF(page) {
    // 設定尺寸及產生 canvas
    const viewport = page.getViewport({ scale: window.devicePixelRatio });
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

  async function createViewer() {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricRef.current = canvas;

    const pdfData = await printPDF(page);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    canvas.setWidth(pdfImage.width / window.devicePixelRatio);
    canvas.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景 並存進 state
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    canvas.requestRenderAll();
    setFabricPages((state) => {
      let arr = [...state];
      arr[id] = canvas;
      return arr;
    });
  }

  const handleSign = async () => {
    const img = selectedSign[0];
    const canvas = fabricRef.current;
    if (img) {
      fabric.Image.fromURL(img, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 30;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        canvas.add(image);
      });
      setSelectedSign(null);
    }
  };

  const style = {
    display: activePage === id ? "block" : "none",
  };

  return (
    <div style={style}>
      <Canvas ref={canvasRef} />
    </div>
  );
}

function PageContainer({ pages, activePage, isSaving, setIsSaving }) {
  // 存 fabaric 生成的 canvas 之後輸出 PDF 要使用
  const [fabricPages, setFabricPages] = useState([]);

  useEffect(() => {
    if (isSaving) {
      savePDF();
      setIsSaving(false);
    }
  }, [isSaving]);

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

  return (
    <>
      {pages?.map((item, index) => (
        <PageCanvas
          key={index}
          id={index}
          page={item}
          setFabricPages={setFabricPages}
          activePage={activePage}
        />
      ))}
    </>
  );
}

export default function PDFCanvas({
  pages,
  activePage,
  isSaving,
  setIsSaving,
}) {
  // 縮放倍率
  const [scale, setScale] = useState(0.5);

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
      <PageWrapper className="page__wrapper" scale={scale}>
        <PageContainer
          pages={pages}
          activePage={activePage}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
        />
      </PageWrapper>
      <Zoom>
        <PanelBtn>
          <RxCursorArrow />
        </PanelBtn>
        <PanelBtn>
          <RxHand />
        </PanelBtn>
        <PanelBtn onClick={() => handleScale("+")}>
          <RxZoomIn />
        </PanelBtn>
        <PanelBtn onClick={() => handleScale("-")}>
          <RxZoomOut />
        </PanelBtn>
        <PanelBtn>
          <RxWidth />
        </PanelBtn>
      </Zoom>
    </>
  );
}

const PanelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  cursor: pointer;

  svg {
    transform: scale(1.5);
  }
`;

const PageWrapper = styled.div`
  position: relative;
  padding: 30px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;

  .canvas-container {
    margin-bottom: -500px;
    margin-right: -800px;
    transform: scale(${(props) => props.scale});
    transform-origin: 0 0;
  }
`;

const Zoom = styled.div`
  position: fixed;
  bottom: 50px;

  display: flex;

  padding: 5px 10px;

  background-color: #222;
  color: white;
  opacity: 0.3;
  border-radius: 5px;

  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;
