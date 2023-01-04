import styled from "styled-components";

export const Mask = styled.div`
  position: absolute;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);

  z-index: 99;
`;
