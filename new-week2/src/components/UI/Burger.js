import styled from "styled-components";
import { MQ_XS } from "../../constants/breakpoint";

export const BurgerButton = () => {
  return (
    <>
      <BurgerBar />
      <BurgerBar />
      <BurgerBar />
    </>
  );
};

export const BurgerList = styled.div`
  display: none;

  position: fixed;
  top: 30px;
  left: 0;

  width: 100%;

  background-color: white;
  color: ${({ theme }) => theme.secondary};

  div {
    display: flex;
    justify-content: center;

    padding: 6px;
    height: 30px;

    &:active {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.main};
    }
  }

  animation: slide 0.3s;
  @keyframes slide {
    0% {
      transform: translate(0, -100px);
    }
    100% {
      transform: translate(0);
    }
  }

  ${MQ_XS} {
    display: ${({ showList }) => (showList ? "block" : "none")};
  }
`;

export const BurgerController = styled.div`
  display: none;

  ${MQ_XS} {
    display: block;
  }
`;

export const BurgerBar = styled.div`
  width: 20px;
  height: 0;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;

  &:nth-child(2) {
    margin: 3px 0;
  }
`;
