import styled from "styled-components";
import { MQ_SM, MQ_XS } from "../../constants/breakpoint";
import { Cancel } from "./Button";

export function LoginBox({ loginUI, setLoginUI }) {
  return (
    <LoginWrapper>
      <Title>
        <div>快速登入</div>
        <img src="./images/logo.svg" alt="點點簽" />
      </Title>
      <LoginWay>請選擇登入點點簽的方式</LoginWay>
      <HintText>
        <span>
          登入後即表示您接受我們的
          <a href="#">服務條款</a>和<a href="#">隱私政策</a>。
        </span>
        <Cancel onClick={() => setLoginUI(false)}>取消</Cancel>
      </HintText>
    </LoginWrapper>
  );
}

export const LoginWay = ({ children }) => {
  return (
    <WayWrapper onClick={() => alert("登入功能未開放，請按簽署新文件直接使用")}>
      <div>{children}</div>
      <img src="./images/icon_fb.svg" alt="facebook" />
      <img src="./images/icon_google.svg" alt="google" />
    </WayWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 60px 30px 20px 30px;
  height: 650px;
  width: 830px;

  background: white;
  border-radius: 35px;

  color: ${({ theme }) => theme.grey.dark};
  letter-spacing: 5px;
  text-indent: 5px;
  text-align: center;

  ${MQ_SM} {
    padding: 60px 30px 40px 30px;
    width: 95%;
    height: 600px;
  }
  ${MQ_XS} {
    padding: 30px 70px;
    height: 320px;
  }
`;
const Title = styled.div`
  div {
    font-size: 2.25rem;
  }
  img {
    margin-top: 1.5rem;
    width: 320px;
  }

  ${MQ_SM} {
    div {
      font-size: 1.5rem;
    }
    img {
      width: 260px;
    }
  }

  ${MQ_XS} {
    div {
      font-size: 0.75rem;
    }
    img {
      margin-top: 0.75rem;
      width: 106px;
    }
  }
`;
const WayWrapper = styled.div`
  div {
    margin: 2rem 0;
    font-size: 1.25rem;
  }
  img {
    margin: 0 30px;
    width: 90px;
    height: 90px;
    cursor: pointer;
  }

  ${MQ_XS} {
    div {
      margin: 1rem 0;
      font-size: 0.75rem;
    }
    img {
      margin: 0 15px;
      width: 36px;
      height: 36px;
    }
  }
`;
const HintText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    margin: 15px 50px 0 100px;
    letter-spacing: 3px;
  }
  a {
    color: ${({ theme }) => theme.grey.dark};
    font-weight: 700;
  }

  ${MQ_SM} {
    flex-direction: column;
    align-items: center;

    span {
      margin: 30px 50px;
    }
  }
  ${MQ_XS} {
    span {
      margin: 1.5rem 1.25rem;
      font-size: 0.75rem;
    }
  }
`;
