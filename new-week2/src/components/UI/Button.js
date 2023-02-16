import styled from "styled-components";
import { Link } from "react-router-dom";
import { MQ_XS } from "../../constants/breakpoint";

export const NewFile = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;

  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: ${({ theme }) => theme.dark};
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1rem;
  text-indent: 1rem;
  text-decoration: none;

  cursor: pointer;

  ${MQ_XS} {
    height: 2.5rem;
    font-size: 0.5rem;
    letter-spacing: 0.5rem;
  }

  transform: perspective(1px) translateZ(0);
  transition: color 0.3s;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 0.3s ease-out;
  }
  &:hover {
    color: white;
  }
  &:hover:before {
    transform: scaleX(1);
  }
`;

export const Cancel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 60px;

  background: #fffaf4;
  box-shadow: 0px 4px 4px #eeede8;
  border-radius: 35px;

  color: ${({ theme }) => theme.secondary};
  font-size: 1.25rem;
  letter-spacing: 3px;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  ${MQ_XS} {
    width: 100px;
    height: 32px;
    border-radius: 12px;
    font-size: 0.5rem;
  }
`;
