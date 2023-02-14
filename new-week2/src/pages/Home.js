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
        <AddButton>
          <div>
            <span>簽署新文件</span>
          </div>
        </AddButton>
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

  margin-top: 6rem;
  padding: 2rem 6rem;
  width: 100%;

  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: ${({ theme }) => theme.dark};
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1rem;
  text-align: center;
  text-indent: 1rem;

  cursor: pointer;

  ${MQ_XS} {
    margin-top: 23rem;
    padding: 1rem 0;
    font-size: 0.5rem;
    letter-spacing: 0.5rem;
  }

  div {
    span {
      position: relative;
      z-index: 99;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0px;
      bottom: 0px;
      right: 0;
      background: ${({ theme }) => theme.primary};
      transition: 0.5s;
      transform: scaleX(0);
      transform-origin: left;

      z-index: 0;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
