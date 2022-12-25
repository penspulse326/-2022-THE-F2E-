import { useEffect, useRef } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { MQ_MD } from "../constants/breakpoint";

export default function Card({ item, index, setActivePage, activePage }) {
  // 用 useRef 抓取此頁面下的 canvas
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  const pageWidth = item._pageInfo.view[2];
  const pageHeight = item._pageInfo.view[3];
  const orientation = {
    width: pageWidth > pageHeight ? 268 : 188,
    height: pageWidth > pageHeight ? 188 : 268,
  };

  useEffect(() => {
    fabricRef.current?.dispose();
    createViewer();
  }, [item]);

  async function createViewer() {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricRef.current = canvas;
    canvas.requestRenderAll();
    const pdfData = await printPDF(item);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    canvas.setWidth(orientation.width);
    canvas.setHeight(orientation.height);

    // 將 PDF 畫面設定為背景 並存進 state
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
  }

  async function printPDF(page) {
    // 設定尺寸及產生 canvas
    const viewport = page.getViewport({
      scale: 0.315,
    });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = orientation.height;
    canvas.width = orientation.width;
    const renderContext = {
      canvasContext: context,
      viewport,
      transform: [1, 0, 0, 1, 0, 0],
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

  return (
    <SnapCard
      onClick={() => setActivePage(index)}
      isActive={activePage === index}
      orientation={orientation}
    >
      <Snap orientation={orientation}>
        <canvas ref={canvasRef} />
      </Snap>
      <PageNumber isActive={activePage === index}>{index + 1}</PageNumber>
    </SnapCard>
  );
}

const SnapCard = styled.div`
  margin-top: 30px;
  width: ${(props) => props.orientation.width};
  height: ${(props) => props.orientation.height};

  border: ${(props) =>
    props.isActive
      ? "3px solid" + props.theme.primary
      : "2px solid" + props.theme.mid_grey};
  border-radius: 5px;

  cursor: pointer;

  ${MQ_MD} {
    width: ${(props) => props.orientation.width / 1.7 + "px"};
    height: ${(props) => props.orientation.height / 1.7 + "px"};
  }
`;

const Snap = styled.div`
  width: 100%;
  height: ${(props) => props.orientation.height};
  border-radius: 3px;
  background-color: aliceblue;

  ${MQ_MD} {
    height: ${(props) => props.orientation.height / 1.7 + "px"};
  }
`;

const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;

  background-color: ${(props) =>
    props.isActive ? props.theme.primary : props.theme.mid_grey};

  color: ${(props) => (props.isActive ? "white" : "black")};
  font-size: 18px;

  ${MQ_MD} {
    height: 24px;
    font-size: 14px;
  }
`;
