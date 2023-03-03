import styled from "styled-components";
import { MQ_MD, MQ_LG } from "../constants/breakpoint";

export const DarkBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 15px 30px;
  margin-bottom: 20px;

  background: ${(props) => props.theme.primary};
  border-radius: 15px;
  border: 2px solid ${(props) => props.theme.primary};
  box-sizing: border-box;

  color: white;

  cursor: pointer;

  transition: 0.3s;

  ${MQ_MD} {
    width: 180px;
    font-size: 20px;

    svg {
      margin-right: 12px;
    }
  }

  ${MQ_LG} {
    width: 220px;
    height: 90px;
    font-size: 28px;
  }

  &:hover {
    background: ${(props) => props.theme.primary_hover};
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
  width: 40px;
  height: 40px;

  ${MQ_MD} {
    font-size: 24px;
    width: 90%;
  }
`;

export const LightBtn_Long = styled(LightBtn)`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  height: 40px;

  ${MQ_MD} {
    font-size: 24px;
    width: 90%;
  }
`;
