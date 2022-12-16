import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { DarkBtn_Long, LightBtn_Long } from "../components/Button";
import { BsCalendar2Check, BsPen, BsTextareaT } from "react-icons/bs";
import { ReactComponent as Logo } from "../components/logo.svg";
import PDFCanvas from "../components/PDFCanvas";
import * as pdfjsLib from "pdfjs-dist/webpack";

const Base64Prefix = "data:application/pdf;base64,";

export default function FileView() {
  const [activePage, setActivePage] = useState(0);
  const [pages, setPages] = useState([]);

  // 使用原生 FileReader 轉檔
  function readBlob(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", reject);
      reader.readAsDataURL(blob);
    });
  }

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

  return (
    <Wrapper>
      <SnapBar>
        <CardWrapper>
          頁面預覽
          <input
            type="file"
            className="select"
            accept="application/pdf"
            onChange={handleUpload}
          />
          {pages.map((item, index) => (
            <Card
              key={index}
              item={item}
              index={index}
              setActivePage={setActivePage}
            />
          ))}
        </CardWrapper>
      </SnapBar>
      <ViewerWrapper>
        <Viewer>
          <PDFCanvas pages={pages} activePage={activePage} />
        </Viewer>
      </ViewerWrapper>
      <OptionBar>
        <div>
          <LightBtn_Long>
            <BsPen />
            新增簽名
          </LightBtn_Long>
          <LightBtn_Long>
            <BsTextareaT />
            新增文字
          </LightBtn_Long>
          <LightBtn_Long>
            <BsCalendar2Check />
            新增日期
          </LightBtn_Long>
        </div>
        <div>
          <DarkBtn_Long>
            <Logo />
            完成簽署
          </DarkBtn_Long>
        </div>
      </OptionBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: stretch;

  box-sizing: border-box;
  background-color: red;
  overflow: hidden;
`;

const SnapBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;

  width: 500px;
  height: calc(100vh - 97px);

  background-color: white;
`;

const CardWrapper = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  flex-grow: 1;
  font-size: 24px;
  font-weight: bold;
  overflow-y: scroll;
`;

const Viewer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: calc(100vw - 1000px);
  height: calc(100vh - 97px);
`;

const ViewerWrapper = styled.div`
  flex-grow: 1;
  background-color: ${(props) => props.theme.mid_grey};
`;

const OptionBar = styled(SnapBar)`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  box-sizing: border-box;

  div div {
    margin: 20px 0;
  }
`;
