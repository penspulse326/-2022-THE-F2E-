import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { SignCanvas } from "../components/SignCanvas";
import { DarkBtn_Long, LightBtn, LightBtn_Long } from "../components/Button";
import { ReactComponent as Logo } from "../assets/logo.svg";
import {
  BsCalendar2Check,
  BsPen,
  BsTextareaT,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import PDFCanvas from "../components/PdfCanvas";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { SignContext } from "../SignContext";
import { MQ_MD, MQ_LG, MQ_MB } from "../constants/breakpoint";
import { UseFileContext } from "../FileContext";
import Mask from "../components/Mask";

const Base64Prefix = "data:application/pdf;base64,";

export default function FileView() {
  const [activePage, setActivePage] = useState(null);
  const [pages, setPages] = useState([]);
  const [signs, setSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMask, setIsMask] = useState(false);
  const [isShowSign, setIsShowSign] = useState(false);

  const { file } = UseFileContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      LoadFile(file);
    } else {
      alert("讀取文件時發生錯誤，導回到首頁後請重新上傳");
      navigate("/");
    }
  }, [file]);

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
  const LoadFile = async (file) => {
    const pdf = await readBlob(file);
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

  const showSign = () => {
    setIsShowSign(true);
  };

  return (
    <Wrapper>
      {isMask && (
        <Mask>
          <SignBoard>
            <SignCanvas setIsMask={setIsMask} setSigns={setSigns}></SignCanvas>
          </SignBoard>
        </Mask>
      )}
      {signs.length > 0 && isShowSign && (
        <Mask>
          <SignList>
            {signs.map((item, index) => (
              <SignCard
                key={index}
                item={item}
                id={index}
                setSigns={setSigns}
                setSelectedSign={setSelectedSign}
                setIsShowSign={setIsShowSign}
              ></SignCard>
            ))}
            <CloseSignList onClick={() => setIsShowSign(false)}>
              關閉
            </CloseSignList>
          </SignList>
        </Mask>
      )}
      <SnapBar>
        頁面預覽
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
      <SignContext.Provider value={{ selectedSign, setSelectedSign }}>
        <ViewerWrapper>
          <PDFCanvas
            pages={pages}
            activePage={activePage}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        </ViewerWrapper>
      </SignContext.Provider>
      <OptionBar>
        <div className="btn-group">
          <AddSignBtn
            text="新增簽名"
            className="Add"
            onClick={(e) => handleAddSign(e)}
          >
            <div className="Add">
              <BsPen className="Add" />
              <span className="Add"></span>
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
          {signs.length > 0 && (
            <SignListBtn onClick={() => showSign()}>選擇簽名</SignListBtn>
          )}
          <LightBtn_Long text="新增文字">
            <BsTextareaT />
            <span></span>
          </LightBtn_Long>
          <LightBtn_Long text="新增日期">
            <BsCalendar2Check />
            <span></span>
          </LightBtn_Long>
        </div>
        <Download onClick={() => setIsSaving(true)}>
          <Logo />
          完成
        </Download>
      </OptionBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 100vw;
  height: 100%;

  overflow: hidden;
`;

const SnapBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 30px 0;
  width: 0px;

  flex-shrink: 0;

  background-color: white;

  font-size: 24px;
  font-weight: bold;

  overflow-y: scroll;

  ${MQ_MD} {
    width: 15%;
  }
  ${MQ_LG} {
    width: 25%;
  }
`;

const ViewerWrapper = styled.div`
  display: flex;
  justify-content: center;

  flex-grow: 1;
  background-color: ${(props) => props.theme.mid_grey};
  overflow: scroll;
`;

const OptionBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 10px;
  width: 100%;
  height: 60px;

  background-color: white;
  box-sizing: border-box;
  overflow: none;
  border-top: 1px solid #eeeeee;

  .btn-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  ${MQ_MD} {
    position: relative;
    right: 0;

    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 20px 0;
    width: 15%;
    height: calc(100% - 20px);

    .btn-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
  ${MQ_LG} {
    width: 25%;
  }
`;

const SignBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  width: 95%;
  height: 400px;
  box-sizing: border-box;

  background-color: white;

  ${MQ_MB} {
    width: 850px;
    height: 420px;
  }
`;

const AddSignBtn = styled(LightBtn_Long)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 5px;
  padding: 0;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.primary};

  color: white;

  ${MQ_MB} {
    margin-bottom: 20px;
    padding: 15px 5px;
    width: 90%;
    height: auto;

    font-size: 24px;

    span::before {
      content: "${({ text }) => text}";
    }
  }
`;

const SignWrapper = styled.div`
  display: none;
  ${MQ_MB} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 10px;
    margin-bottom: -10px;

    border-radius: 12px;
    box-sizing: border-box;

    cursor: default;
  }
`;

const SingleSignWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
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

function SignCard({ item, id, setSigns, setSelectedSign, setIsShowSign }) {
  const handleDeleteSign = () => {
    setSigns((state) => state.filter((item, index) => index !== id));
  };
  const handleAdd = () => {
    const newSign = [item];
    setSelectedSign(newSign);
    setIsShowSign(false);
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

const Download = styled(DarkBtn_Long)`
  width: 120px;

  font-size: 16px;

  svg {
    margin-right: 10px;
  }

  ${MQ_MB} {
    width: 90%;
    font-size: 24px;
  }
`;
const SignListBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 10px;
  margin: 0 2px;
  height: 40px;

  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.primary};
  box-sizing: border-box;

  color: ${(props) => props.theme.primary};
  font-size: 16px;
  font-weight: 600;

  ${MQ_MB} {
    display: none;
  }
`;
const SignList = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  width: 90%;
  background: ${(props) => props.theme.mid_grey};
`;
const CloseSignList = styled.div`
  align-self: flex-end;
  margin-top: 10px;
  color: ${(props) => props.theme.primary};
  font-weight: 700;
`;
