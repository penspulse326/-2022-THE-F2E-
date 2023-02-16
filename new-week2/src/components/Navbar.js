import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MQ_XS, MQ_MD } from "../constants/breakpoint";
import { BurgerButton, BurgerList, BurgerController } from "./UI/Burger";
import { LoginBox } from "./UI/Login";
import Mask from "./UI/Mask";

export default function Navbar() {
  const [showList, setShowList] = useState(false);
  const [loginUI, setLoginUI] = useState(false);

  const handleShowList = () => {
    setShowList((state) => !state);
  };

  return (
    <>
      <NavWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <NavGroup>
          <MenuItems setLoginUI={setLoginUI} />
        </NavGroup>
        <BurgerController onClick={() => handleShowList()}>
          <BurgerButton />
        </BurgerController>
      </NavWrapper>
      <BurgerList showList={showList}>
        <MenuItems setLoginUI={setLoginUI} />
      </BurgerList>
      <Mask state={loginUI}>
        <LoginBox setLoginUI={setLoginUI} />
      </Mask>
    </>
  );
}

const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 242px;
  width: 100%;
  height: 60px;

  background-color: ${({ theme }) => theme.main};

  ${MQ_XS} {
    height: 30px;
  }

  ${MQ_MD} {
    padding: 0 15px;
  }
`;

const NavGroup = styled.div`
  display: flex;
  color: ${({ theme }) => theme.secondary};

  div {
    margin-left: 30px;
    cursor: pointer;
  }

  a:hover,
  div:hover {
    color: ${({ theme }) => theme.primary};
  }

  ${MQ_XS} {
    display: none;
  }
`;

const Logo = styled.img`
  content: url("../images/logo.svg");
  width: 100px;

  ${MQ_XS} {
    width: 60px;
  }
`;

const MenuItems = ({ setLoginUI }) => {
  const handleLoginClick = () => {
    setLoginUI(true);
  };
  return (
    <>
      <div style={{ color: "#EEEDE8" }}>邀請他人簽署</div>
      <div>
        <CleanLink to="upload" style={{ textDecoration: "none" }}>
          簽署新文件
        </CleanLink>
      </div>
      <div onClick={() => handleLoginClick()}>登入</div>
    </>
  );
};

const CleanLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.secondary};
`;
