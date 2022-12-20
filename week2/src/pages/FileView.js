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
      </SnapBar>
      <ViewerWrapper>
        <PDFCanvas pages={pages} activePage={activePage} />
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
  position: relative;
  display: flex;

  width: 100vw;
  height: 100%;

  background-color: red;
  overflow: hidden;
`;

const SnapBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 30px 0;
  width: 500px;
  flex-shrink: 0;

  background-color: white;

  font-size: 24px;
  font-weight: bold;

  overflow-y: scroll;
`;

const ViewerWrapper = styled.div`
  display: flex;
  justify-content: center;

  flex-grow: 1;
  background-color: ${(props) => props.theme.mid_grey};
  overflow: scroll;
`;

const OptionBar = styled(SnapBar)`
  justify-content: space-between;

  div div {
    margin-bottom: 30px;
  }

  overflow: auto;
`;
