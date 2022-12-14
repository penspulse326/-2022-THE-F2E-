import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
import styled from "styled-components";

const PRINT_RATE = 150.0 / 72.0;
const Base64Prefix = "data:application/pdf;base64,";

const Canvas = styled.canvas`
  box-shadow: 1px 1px 5px 1px #ccc;
`;

function PageCanvas({ page, id, setFabricPages }) {
  // 用 useRef 抓取此頁面下的 canvas
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    fabricRef.current?.dispose();
    createViewer();
  }, [page]);

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

  return (
    <div>
      <Canvas ref={canvasRef} />
      <button onClick={() => handleSign()}>新增簽名</button>
    </div>
  );
}

function PageContainer({ pages }) {
  // 存 fabaric 生成的 canvas 之後輸出 PDF 要使用
  const [fabricPages, setFabricPages] = useState(new Array(pages.length));

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
          quality: 0.85,
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
    <div>
      {pages.length > 0 &&
        pages.map((item, index) => (
          <PageCanvas
            key={index}
            id={index}
            page={item}
            setFabricPages={setFabricPages}
          />
        ))}
      <button onClick={() => savePDF()}>轉出你的簽名檔案</button>
    </div>
  );
}

export function PDFCanvas() {
  // 存放讀進來的 PDF 檔
  const [pages, setPages] = useState([]);

  // 將 PDF 檔轉成 Base64 編碼資料 分頁放入 state 並傳給 PageContainer
  const handleUpload = async (e) => {
    const pdf = await readBlob(e.target.files[0]);
    const data = window.atob(pdf.substring(Base64Prefix.length));
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    const pdfLength = pdfDoc.numPages;
    let arr = [];
    for (let i = 1; i <= pdfLength; i++) {
      const pdfPage = await pdfDoc.getPage(i);
      arr.push(pdfPage);
    }
    setPages(() => arr);
  };

  // 使用原生 FileReader 轉檔
  function readBlob(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", reject);
      reader.readAsDataURL(blob);
    });
  }

  return (
    <PageWrapper>
      <input
        type="file"
        className="select"
        accept="application/pdf"
        onChange={handleUpload}
      />
      <PageContainer pages={pages} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 900px;
`;
