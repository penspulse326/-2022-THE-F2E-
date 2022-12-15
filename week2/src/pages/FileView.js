import styled from "styled-components";
import Card from "../components/Card";
import { DarkBtn_Long, LightBtn_Long } from "../components/Button";
import { BsCalendar2Check, BsPen, BsTextareaT } from "react-icons/bs";
import { ReactComponent as Logo } from "../components/logo.svg";
import { PDFCanvas } from "../components/PDFCanvas";

export default function FileView() {
  const file = [1, 2, 3, 4];
  return (
    <Wrapper>
      <SnapBar>
        <CardWrapper>
          頁面預覽
          {file.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </CardWrapper>
      </SnapBar>
      <ViewerWrapper>
        <Viewer>
          <PDFCanvas></PDFCanvas>
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh - 97px);
  overflow-y: scroll;
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
