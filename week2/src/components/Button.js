import styled from "styled-components";
import { MQ_MD, MQ_LG } from "../constants/breakpoint";

export const DarkBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 20px 5px;
  margin-bottom: 20px;
  width: 196px;
  height: 77px;

  background: ${(props) => props.theme.primary};
  border-radius: 15px;
  box-sizing: border-box;

  color: white;
  font-size: 20px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.primary_hover};
  }

  svg {
    margin-right: 12px;
  }

  ${MQ_MD} {
    padding: 24px 30px;
    width: 236px;
    height: 87px;
    font-size: 32px;
  }
`;

export const LightBtn = styled(DarkBtn)`
  background-color: white;
  border: 2px solid ${(props) => props.theme.primary};

  color: ${(props) => props.theme.primary};

  &:hover {
    color: white;
    border: 2px solid ${(props) => props.theme.primary_hover};
  }
`;

export const DarkBtn_Long = styled(DarkBtn)`
  font-size: 18px;
  font-weight: 600;
  width: 10%;
  height: 77px;

  ${MQ_MD} {
    font-size: 24px;
    width: 90%;
  }
`;

export const LightBtn_Long = styled(LightBtn)`
  font-size: 18px;
  font-weight: 600;
  width: 10%;
  height: 77px;

  ${MQ_MD} {
    font-size: 24px;
    width: 90%;
  }
`;
