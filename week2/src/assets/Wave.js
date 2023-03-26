import styled from "styled-components";
import { MQ_MD } from "../constants/breakpoint";

export default function Wave() {
  return (
    <>
      <Wave1 />
      <Wave2 />
    </>
  );
}

const Wave1 = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 215px;

  background-repeat: no-repeat;
  background-position: bottom;

  ${MQ_MD} {
    display: block;
    background-image: url("./images/wave1.svg");
  }
`;

const Wave2 = styled(Wave1)`
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 244px;

  background-repeat: no-repeat;
  background-position: right;

  ${MQ_MD} {
    display: block;
    background-image: url("./images/wave2.svg");
  }
`;
