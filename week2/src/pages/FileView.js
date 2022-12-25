import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { SignCanvas } from "../components/SignCanvas";
import { DarkBtn_Long, LightBtn_Long } from "../components/Button";
import {
  BsCalendar2Check,
  BsPen,
  BsTextareaT,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { ReactComponent as Logo } from "../components/logo.svg";
import PDFCanvas from "../components/PDFCanvas";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { SignContext } from "../SignContext";
import { MQ_MD } from "../constants/breakpoint";

const Base64Prefix = "data:application/pdf;base64,";

export default function FileView() {
  const [activePage, setActivePage] = useState(null);
  const [pages, setPages] = useState([]);
  const [signs, setSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMask, setIsMask] = useState(false);

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
    setTimeout(() => setActivePage(0), 1000);
  };

  const handleAddSign = (e) => {
    if (e.target.classList.contains("Add")) {
      if (signs.length < 3) {
        setIsMask(true);
      } else {
        if (e.target.className !== "Add") return;
        alert("最多只能有三個簽名，請刪除任一個後再新增簽名。");
      }
    }
  };

  return (
    <SignContext.Provider value={{ selectedSign, setSelectedSign }}>
      <Wrapper>
        {isMask && (
          <Mask>
            <SignBoard>
              <SignCanvas
                setIsMask={setIsMask}
                setSigns={setSigns}
              ></SignCanvas>
            </SignBoard>
          </Mask>
        )}
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
              activePage={activePage}
            />
          ))}
        </SnapBar>
        <ViewerWrapper>
          <PDFCanvas
            pages={pages}
            activePage={activePage}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        </ViewerWrapper>
        <OptionBar>
          <div>
            <AddSignBtn className="Add" onClick={(e) => handleAddSign(e)}>
              <div className="Add">
                <BsPen />
                新增簽名
              </div>
              {signs.length > 0 && (
                <SignWrapper>
                  {signs.map((item, index) => (
                    <SignCard
                      key={index}
                      item={item}
                      id={index}
                      setSigns={setSigns}
                      setSelectedSign={setSelectedSign}
                    ></SignCard>
                  ))}
                </SignWrapper>
              )}
            </AddSignBtn>
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
            <DarkBtn_Long onClick={() => setIsSaving(true)}>
              <Logo />
              完成簽署
            </DarkBtn_Long>
          </div>
        </OptionBar>
      </Wrapper>
    </SignContext.Provider>
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

  ${MQ_MD} {
    width: 300px;
  }
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
  overflow: auto;

  ${LightBtn_Long} {
    margin-bottom: 30px;
  }
`;

const Mask = styled.div`
  position: absolute;
  left: 0px;
  top: -97px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);

  z-index: 99;
`;

const SignBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 30px 50px;
  width: 850px;
  height: 420px;
  box-sizing: border-box;

  background-color: white;
`;

const AddSignBtn = styled(LightBtn_Long)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 20px 5px;
  height: auto;
  background-color: ${({ theme }) => theme.primary};

  color: white;
`;

const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 10px;
  margin-bottom: -10px;

  border-radius: 12px;
  box-sizing: border-box;

  cursor: default;
`;

const SingleSignWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 5px;
  width: 100%;

  background-color: white;

  border-radius: 12px;
  box-sizing: border-box;

  img {
    padding: 10px 5px;
    width: 50%;
    flex-grow: 1;
  }
`;

const CardBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 50px;
  height: 100%;

  cursor: pointer;
`;

function SignCard({ item, id, setSigns, setSelectedSign }) {
  const handleDeleteSign = () => {
    setSigns((state) => state.filter((item, index) => index !== id));
  };
  const handleAdd = () => {
    const newSign = [item];
    setSelectedSign(newSign);
  };
  return (
    <SingleSignWrapper>
      <img src={item} alt="" />
      <CardBtn onClick={() => handleAdd()}>
        <BsPencilSquare fill="#000000"></BsPencilSquare>
      </CardBtn>
      <CardBtn>
        <BsTrash fill="#000000" onClick={() => handleDeleteSign()}></BsTrash>
      </CardBtn>
    </SingleSignWrapper>
  );
}
