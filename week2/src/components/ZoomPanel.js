import styled from "styled-components";
import {
  RxCursorArrow,
  RxHand,
  RxZoomIn,
  RxZoomOut,
  RxWidth,
} from "react-icons/rx";
import { MQ_MB } from "../constants/breakpoint";

export default function ZoomPanel({ scale, setScale }) {
  const handleScale = (zoom) => {
    if (zoom === "+") {
      setScale(scale + 0.125);
    }
    if (zoom === "-" && scale > 0.25) {
      setScale(scale - 0.125);
    }
  };
  return (
    <Zoom>
      <PanelBtn>
        <RxCursorArrow />
      </PanelBtn>
      <PanelBtn>
        <RxHand />
      </PanelBtn>
      <PanelBtn onClick={() => handleScale("+")}>
        <RxZoomIn />
      </PanelBtn>
      <PanelBtn onClick={() => handleScale("-")}>
        <RxZoomOut />
      </PanelBtn>
      <PanelBtn>
        <RxWidth />
      </PanelBtn>
    </Zoom>
  );
}

const PanelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  cursor: pointer;

  svg {
    transform: scale(1.5);
  }
`;

const Zoom = styled.div`
  position: fixed;
  bottom: 50px;

  display: none;
  padding: 5px 10px;

  background-color: #222;
  color: white;
  opacity: 0.3;
  border-radius: 5px;

  transition: 0.3s;

  &:hover {
    opacity: 1;
  }

  ${MQ_MB} {
    display: flex;
  }
`;
