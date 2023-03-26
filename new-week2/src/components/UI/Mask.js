import styled from "styled-components";

const Mask = styled.div`
  display: ${({ state }) => (state ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 99;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.2);
`;

export default Mask;
