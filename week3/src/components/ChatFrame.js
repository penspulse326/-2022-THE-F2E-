import styled from "styled-components";

const ChatFrame = styled.div`
  position: absolute;
  padding: 80px 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  box-sizing: border-box;
  backdrop-filter: blur(15px);
  border-radius: 30px;
  color: ${(props) => props.theme.colors.dark_grey};

  font-size: 32px;
  font-weight: 500;
  line-height: 58px;
  letter-spacing: 0px;
  text-align: left;

  .btn {
    align-self: flex-end;
  }

  .text {
    align-self: flex-start;
    position: relative;
    white-space: pre-line;
    line-height: 180%;
  }
`;

export default ChatFrame;
