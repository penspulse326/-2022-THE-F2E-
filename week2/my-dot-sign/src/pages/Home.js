import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 30px;

  width: 376px;
  height: 197px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 200px;

  position: absolute;
  width: 1536px;
  height: 650px;
  left: 191px;
  top: 278px;
`;

export default function Home() {
  return (
    <div className="home">
      <Wrapper>
        <Content></Content>
      </Wrapper>
    </div>
  );
}
