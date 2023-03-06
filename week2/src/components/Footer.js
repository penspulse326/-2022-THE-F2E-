import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { MQ_MD } from "../constants/breakpoint";

export default function Footer() {
  const [progress, setProgress] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setProgress(() => {
      if (location.pathname === "/") return 1;
      if (location.pathname === "/fileview") return 2;
      if (location.pathname === "/download") return 3;
    });
  }, [location]);

  return (
    <FooterWrapper>
      {progress === 1 && <Progress1 />}
      {progress === 2 && <Progress2 />}
      {progress === 3 && <Progress3 />}
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  position: relative;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 40px;
  height: 60px;
  width: 100%;

  background: #ffffff;
  box-sizing: border-box;
  border-top: 1px solid #eeeeee;

  z-index: 99;

  ${MQ_MD} {
    display: none;
  }
`;

const Progress1 = styled.img`
  width: 100%;

  content: url("./images/progress_1.png");

  background-repeat: no-repeat;
  background-size: contain;
`;

const Progress2 = styled(Progress1)`
  content: url("./images/progress_2.png");
`;

const Progress3 = styled(Progress1)`
  content: url("./images/progress_3.png");
`;
