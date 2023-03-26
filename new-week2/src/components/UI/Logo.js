import styled from "styled-components";
import { MQ_SM, MQ_XS } from "../../constants/breakpoint";

const Logo = styled.img`
  content: url("./images/logo.svg");

  ${MQ_SM} {
    justify-self: center;
  }
  ${MQ_XS} {
    width: 200px;
  }
`;

export default Logo;
