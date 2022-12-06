import styled from "styled-components";

export const Start = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 23px;
  height: 71px;
  width: 256px;

  background: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  box-sizing: border-box;

  color: white;
  font-size: 40px;
  font-weight: 500;

  cursor: pointer;
  z-index: 99;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  &:before {
    content: "${(props) => props.content}";
  }
`;

export const ConfirmButton = styled(Start)`
  justify-content: center;

  height: 90px;
  width: 525px;

  border-radius: 30px;

  font-weight: 900;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

export const Grey = styled(Start)`
  height: 71px;
  width: 175px;

  background: white;
  border: 3px solid ${(props) => props.theme.colors.light_color};
  color: ${(props) => props.theme.colors.mid_grey};

  &:hover {
    background: ${(props) => props.theme.colors.tertiary};
  }

  &:before {
    content: "${(props) => props.content}";
  }
`;

export const GreyButton = ({ content }) => (
  <Grey content={content}>
    <img alt="" src="./images/grey_arrow.png" style={{ marginLeft: "5px" }} />
  </Grey>
);

export const StartButton = ({ content }) => (
  <Start content={content}>
    <img alt="" src="./images/arrow.png" style={{ marginLeft: "5px" }} />
  </Start>
);

export const DialogBack = styled.div`
  position: fixed;
  bottom: 30px;
  left: 40px;

  height: 82px;
  width: 86px;

  background-image: url("./images/back.png");

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
