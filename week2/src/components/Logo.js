import styled from "styled-components";
import { Link } from "react-router-dom";
import { MQ_MD, MQ_LG} from "../constants/breakpoint"


const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("./images/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  ${MQ_LG} {
    width: 60px;
    height: 60px;
  }

  ${MQ_MD} {
    width: 40px;
    height: 40px;
  }
`;

const LogoLink = styled(Link)`
  margin: 0 30px;
`;

export default function Logo() {
  return (
    <LogoLink to="/">
      <LogoWrapper></LogoWrapper>
    </LogoLink>
  );
}
