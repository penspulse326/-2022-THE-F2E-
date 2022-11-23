import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
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

  z-index: 99;
`;

export default function StartButton() {
  return (
    <Button>
      開始試煉
      <img src="./images/arrow.png" alt="" />
    </Button>
  );
}
