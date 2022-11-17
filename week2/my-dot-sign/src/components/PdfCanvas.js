import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
const PRINT_RATE = 150/72.0;
const Base64Prefix = "data:application/pdf;base64,";

function PageCanvas({ page, id, innerRef }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  useEffect(() => {
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
    
    // 將 PDF 畫面設定為背景
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    innerRef.current[id] = canvas;
  }

  const handleSign = () => {
    const img = localStorage.getItem("img");
    if (img) {
      fabric.Image.fromURL(img, function (image) {
        // 設定簽名出現的位置及大小，後續可調整

        image.top = 30;
        image.scaleX = 1;
        image.scaleY = 1;
        fabricRef.current.add(image);
      });
    }
  };

  return (
    <div>
      <canvas style={{ border: "1px solid #000" }} ref={canvasRef} />
      <button onClick={() => handleSign()}>新增簽名</button>
    </div>
  );
}

function PageContainer({ pages }) {
  const pageRef = useRef([]);

  const savePDF = () => {
    if (pageRef.current.length > 0) {
      // jsPDF 實例化必定會有第一頁的空白頁 因此先對該頁進行設定
      const innerPages = pageRef.current;
      const pdf = new jsPDF({
        unit: 'px',
        userUnit: 72,
      });
      console.log(innerPages[0].width, pdf.internal.pageSize.width)
      for (let i = 0; i < pages.length; i++) {
        // 將 canvas 存為圖片
        const image = innerPages[i].toDataURL("image/png");

        // 設定背景在 PDF 中的位置及大小
        const width = Math.min(innerPages[i].width ,pdf.internal.pageSize.width);
        const height = Math.min(innerPages[i].height ,pdf.internal.pageSize.height);
        pdf.addImage(image, "png", 0, 0, width, height);
        // 設定下一頁的大小
        if (i < pages.length - 1)
          pdf.addPage();
      }
      pdf.save("yourPDF");
    } else {
      alert("請上傳好檔案再進行儲存");
    }
  };

  return (
    <div>
      {pages.length === 0 ? (
        <></>
      ) : (
        pages.map((item, index) => (
          <PageCanvas key={index} id={index} page={item} innerRef={pageRef} />
        ))
      )}
      <button
        onClick={() => {
          savePDF();
        }}
      >
        轉出你的簽名檔案
      </button>
    </div>
  );
}

export function PDFCanvas() {
  const [pages, setPages] = useState([]);

  const handleUpload = async (e) => {
    const pdf = await readBlob(e.target.files[0]);
    const data = atob(pdf.substring(Base64Prefix.length));
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
    <div>
      <input
        type="file"
        className="select"
        accept="application/pdf"
        onChange={handleUpload}
      />
      <PageContainer pages={pages} />
    </div>
  );
}
