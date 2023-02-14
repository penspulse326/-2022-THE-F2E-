import styled from "styled-components";
import { MQ_SM, MQ_XS, MQ_MD, MQ_LG } from "../constants/breakpoint";

export default function Home() {
  return (
    <Container>
      <TitleWrapper>
        <div>
          <Title />
          <TitleText>線上簽署，方便快速。</TitleText>
        </div>
        <AddButton>簽署新文件</AddButton>
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

const Title = styled.img`
  content: url("./images/logo.svg");

  ${MQ_SM} {
    justify-self: center;
  }
  ${MQ_XS} {
    width: 200px;
  }
`;

const TitleWrapper = styled.div`
  justify-self: flex-end;
  position: relative;
  top: 220px;
  margin-right: 20%;
  height: 117px;

  ${MQ_MD} {
    margin-right: 5%;
  }
  ${MQ_SM} {
    margin: 0;
    top: 100px;
    justify-self: center;
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

const AddButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 6rem;
  width: 100%;
  height: 100px;

  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: ${({ theme }) => theme.dark};
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1rem;
  text-indent: 1rem;

  cursor: pointer;

  ${MQ_XS} {
    margin-top: 23rem;
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
