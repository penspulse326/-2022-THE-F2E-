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
  top: 219px;
  margin-right: 20%;
  height: 117px;

  ${MQ_MD} {
    margin-right: 5%;
  }
  ${MQ_SM} {
    margin: 0;
    top: 150px;
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
