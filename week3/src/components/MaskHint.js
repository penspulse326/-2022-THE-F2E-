import styled from "styled-components";
import { GreyButton } from "./Buttons";
import ChatFrame from "./ChatFrame";
import { NamedWorker2 } from "./Workers";

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Dialog = styled(ChatFrame)`
  position: absolute;
  height: 381px;
  width: 834px;
  left: 548px;
  top: 300px;
  box-sizing: border-box;
`;

export default function MaskHint({ method, content }) {
  return (
    <Mask>
      <Dialog>
        <div className="text">{content}</div>
        <div className="btn">
          <GreyButton content="好的" onClick={() => method(false)}>
            <img
              alt=""
              src="./images/grey_arrow.png"
              style={{ marginLeft: "15px" }}
            />
          </GreyButton>
        </div>
      </Dialog>
      <NamedWorker2></NamedWorker2>
    </Mask>
  );
}
