import styled from "styled-components"
import { NormalDialog } from "../components/ChatFrame"
import { NamedWorker2 } from "../components/Workers";
import { StartButton } from "../components/Buttons";

export default function Stage__1() {
    const handleClick = () => {
        alert(123)
    }
    return (
        <div className="stage1__container">
            <Dialog onClick={() => handleClick()} />
        </div>
    )
}

function Dialog() {
    return (
        <>
            <DialogBox>
                <div className="text">
                    {textContent}
                </div>
                <div className="btn" >
                    <StartButton content="開始試煉">
                        <img
                            alt=""
                            src="./images/arrow.png"
                            style={{ marginLeft: "5px" }}
                        />
                    </StartButton>
                </div>
            </DialogBox>
            <NamedWorker2 onStage={true}></NamedWorker2>
        </>
    )
}

const DialogBox = styled(NormalDialog)`
 width: 1084px;
`

const MarkedText = styled.span`
    color: ${props => props.theme.colors.primary};
`
const Mark = (text) => <MarkedText>{text}</MarkedText>

const textContent = <>
    哈囉~小菜。<br />
    我是開發 A 組的 PO，小敏。<br />
    <br />
    PO也就是{Mark("產品負責人(Product Owner)")}。<br />
    產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序，對齊產品目標。最後排出產品待辦清單(Product Backlog)唷！<br />
    <br />
    剛好我最近手邊有一個『人才招募系統』的案子，我才剛列出了『產品需求清單』。既然你都來了，{Mark("來試試看調整產品優先度，排出產品待辦清單吧！")}
</>
