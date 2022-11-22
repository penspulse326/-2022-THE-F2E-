import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("./images/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export default function Logo() {
  return (
    <Link to="/home">
      <LogoWrapper></LogoWrapper>
    </Link>
  );
}
