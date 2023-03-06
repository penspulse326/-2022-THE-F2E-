import styled from "styled-components";
import { MQ_MD, MQ_LG, MQ_MB } from "../constants/breakpoint";

export const DarkBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 10px;
  margin-bottom: 20px;

  background: ${(props) => props.theme.primary};
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.primary};
  box-sizing: border-box;

  color: white;
  font-size: 16px;

  cursor: pointer;

  transition: 0.3s;

  ${MQ_MD} {
    padding: 15px 30px;
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
  margin: 0 2px;
  padding: 0;
  width: 40px;
  height: 40px;

  border-radius: 10px;

  font-size: 18px;
  font-weight: 600;

  ${MQ_MB} {
    margin-bottom: 20px;
    width: 90%;
    height: 76px;

    border-radius: 15px;
    font-size: 24px;

    span::before {
      content: "${({ text }) => text}";
    }
  }
`;

export const LightBtn_Long = styled(LightBtn)`
  margin: 0 2px;
  padding: 0;
  width: 40px;
  height: 40px;

  border-radius: 10px;

  font-size: 18px;
  font-weight: 600;

  ${MQ_MB} {
    margin-bottom: 20px;
    width: 90%;
    height: 76px;

    border-radius: 15px;
    font-size: 24px;

    span::before {
      content: "${({ text }) => text}";
    }
  }
`;
