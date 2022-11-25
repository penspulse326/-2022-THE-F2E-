import styled from "styled-components";

export const Start = styled.div`
  &:before {
    content: "${(props) => props.content}";
  }
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 71px;
  width: 256px;
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;

  background: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 40px;
  font-weight: 500;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;

export const ConfirmButton = styled(Start)`
  justify-content: center;
  height: 90px;
  width: 525px;
  border-radius: 30px;
  font-weight: 900;
`;

export const Grey = styled(Start)`
  &:before {
    content: "${(props) => props.content}";
  }
  height: 71px;
  width: 175px;

  background: white;
  border: 3px solid ${(props) => props.theme.colors.light_color};
  color: ${(props) => props.theme.colors.mid_grey};

  &:hover {
    background: ${(props) => props.theme.colors.tertiary};
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
