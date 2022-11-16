import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";

const Base64Prefix = "data:application/pdf;base64,";
const pdf = new jsPDF();

function PageCanvas({ page, img }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  useEffect(() => {
    createViewer();
  }, [img]);

  async function printPDF(page) {
    // 設定尺寸及產生 canvas
    const viewport = page.getViewport({ scale: window.devicePixelRatio });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
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
  }

  const handleSign = () => {
    fabric.Image.fromURL(img, function (image) {
      // 設定簽名出現的位置及大小，後續可調整

      image.top = 30;
      image.scaleX = 0.5;
      image.scaleY = 0.5;
      fabricRef.current.add(image);
    });
  };

  const saveImage = () => {
    // 將 canvas 存為圖片
    const image = fabricRef.current.toDataURL("image/png");

    // 設定背景在 PDF 中的位置及大小
    const width = pdf.internal.pageSize.width;
    const height = pdf.internal.pageSize.height;
  };

  return (
    <div>
      <canvas style={{ border: "1px solid #000" }} ref={canvasRef} />
      <button onClick={() => handleSign()}>新增簽名</button>
    </div>
  );
}

export function PdfCanvas() {
  const pdfRef = useRef([]);
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [signImg, setSignImg] = useState(null);

  const handleUpload = async (e) => {
    const pdf = await readBlob(e.target.files[0]);
    const data = atob(pdf.substring(Base64Prefix.length));
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    setFile(pdfDoc);
    const pdfLength = pdfDoc.numPages;
    let arr = [];
    for (let i = 1; i <= pdfLength; i++) {
      const pdfPage = await pdfDoc.getPage(i);
      arr.push(pdfPage);
    }
    setPages(arr);
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

  const selectSign = (e) => {
    const sign = e.target;
    if (localStorage.getItem("img")) {
      sign.src = localStorage.getItem("img");
      setSignImg(sign.src);
    }
  };
  const savePDF = () => {};
  return (
    <div>
      <input
        type="file"
        className="select"
        accept="application/pdf"
        onChange={handleUpload}
      />
      <p>選擇簽名</p>
      <img
        className="sign"
        style={{ border: "1px solid #000" }}
        width="250"
        height="150"
        onClick={(e) => selectSign(e)}
      />
      {pages.length ? (
        pages.map((i, index) => (
          <PageCanvas
            key={index}
            ref={(el) => (pdfRef.current[i] = el)}
            page={i}
            img={signImg}
          />
        ))
      ) : (
        <></>
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
