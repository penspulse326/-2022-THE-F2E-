import { useState } from "react";
import styled from "styled-components";
import { MQ_XS, MQ_MD } from "../constants/breakpoint";
import { BurgerButton, BurgerList, BurgerController } from "./UI/Burger";

export default function Navbar() {
  const [showList, setShowList] = useState(false);

  const handleShowList = () => {
    setShowList((state) => !state);
  };

  return (
    <>
      <NavWrapper>
        <a href="#">
          <Logo />
        </a>
        <NavGroup>
          <MenuItems />
        </NavGroup>
        <BurgerController onClick={() => handleShowList()}>
          <BurgerButton />
        </BurgerController>
      </NavWrapper>
      <BurgerList showList={showList}>
        <MenuItems />
      </BurgerList>
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

const MenuItems = () => {
  return (
    <>
      <div style={{ color: "#EEEDE8" }}>邀請他人簽署</div>
      <div>簽署新文件</div>
      <div>登入</div>
    </>
  );
};
