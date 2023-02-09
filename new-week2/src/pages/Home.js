import styled from "styled-components";
import { MQ_SM, MQ_XS, MQ_MD } from "../constants/breakpoint";

export default function Home() {
  return (
    <Cover className="h-100">
      <div className="container">
        <Title alt="" />
      </div>
    </Cover>
  );
}

const Cover = styled.div`
  background-image: url("./images/cover.png");
  background-position: 50% center;
  background-size: cover;

  ${MQ_XS} {
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.img`
  content: url("./images/logo.svg");

  position: relative;
  top: 219px;
  left: 55%;

  ${MQ_XS} {
    display: flex;
    justify-content: center;
    width: 200px;
  }

  ${MQ_SM} {
  }

  ${MQ_MD} {
  }
`;
