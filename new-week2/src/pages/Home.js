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
        <AddButton>簽署新文件</AddButton>
      </TitleWrapper>
      <Mask>
        <LoginWrapper>
          <div>
            <div className="text-login">快速登入</div>
            <Title />
          </div>
          <div>
            <div className="text-choose">請選擇登入點點簽的方式</div>
            <div className="icon-box">
              <img src="./images/icon_fb.svg" alt="facebook" />
              <img src="./images/icon_google.svg" alt="google" />
            </div>
          </div>
          <div className="info-box">
            <span>
              登入後即表示您接受我們的
              <a href="#">服務條款</a> 和<a href="#">隱私政策</a>。
            </span>
            <CancelButton>取消</CancelButton>
          </div>
        </LoginWrapper>
      </Mask>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: flex-end;

  position: relative;
  top: 220px;

  margin-right: 20%;
  height: 40%;

  ${MQ_MD} {
    margin-right: 5%;
  }
  ${MQ_SM} {
    justify-self: center;
    top: 100px;
    margin: 0;
    height: 75%;
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;

  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: ${({ theme }) => theme.dark};
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1rem;
  text-indent: 1rem;

  cursor: pointer;

  ${MQ_XS} {
    height: 2.5rem;
    font-size: 0.5rem;
    letter-spacing: 0.5rem;
  }

  transform: perspective(1px) translateZ(0);
  transition: color 0.3s;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 0.3s ease-out;
  }
  &:hover {
    color: white;
  }
  &:hover:before {
    transform: scaleX(1);
  }
`;

const Mask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 99;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.2);
`;

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

  .text-login {
    margin-bottom: 1.5rem;
    font-size: 2.25rem;
  }

  .text-choose {
    font-size: 1.25rem;
  }

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 2.25rem;

    img {
      width: 90px;
      height: 90px;
      margin: 0 1rem;
    }
  }

  .info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 50px;
    }
  }

  ${Title} {
    width: 300px;
  }
`;

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  width: 180px;

  background: #fffaf4;
  box-shadow: 0px 4px 4px #eeede8;
  border-radius: 35px;

  color: ${({ theme }) => theme.secondary};
`;
