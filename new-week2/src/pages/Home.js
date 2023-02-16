import styled from "styled-components";
import Logo from "../components/UI/Logo";
import { MQ_SM, MQ_XS, MQ_MD, MQ_LG } from "../constants/breakpoint";
import { NewFile } from "../components/UI/Button";

export default function Home() {
  return (
    <Container>
      <TitleWrapper>
        <div>
          <Logo />
          <TitleText>線上簽署，方便快速。</TitleText>
        </div>
        <NewFile to="upload">簽署新文件</NewFile>
      </TitleWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: grid;

  width: 100%;
  height: 100%;

  background-color: red;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  object-fit: cover;

  ${MQ_LG} {
    background-image: url("./images/cover.png");
  }
  ${MQ_SM} {
    background-image: url("./images/cover-sm.png");
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: flex-end;

  position: relative;
  top: 220px;

  margin-right: 20%;
  height: 40%;

  ${MQ_MD} {
    margin-right: 5%;
  }
  ${MQ_SM} {
    justify-self: center;
    top: 100px;
    margin: 0;
    height: 75%;
  }
`;

const TitleText = styled.p`
  margin-top: 1.5rem;
  padding: 0 5px;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.5rem;
  text-align: justify;

  &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }

  ${MQ_XS} {
    margin-top: 0.5rem;
    font-size: 0.5rem;
  }
`;
