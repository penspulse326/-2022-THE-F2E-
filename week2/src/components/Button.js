import styled from "styled-components";

export const DarkBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 24px 30px;
  width: 236px;
  height: 87px;

  background: ${(props) => props.theme.primary};
  border-radius: 15px;
  box-sizing: border-box;

  color: white;
  font-size: 32px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.primary_hover};
  }

  svg {
    margin-right: 12px;
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
  width: 360px;
  height: 77px;
`;

export const LightBtn_Long = styled(LightBtn)`
  width: 360px;
  height: 77px;
`;
