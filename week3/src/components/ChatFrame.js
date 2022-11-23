import styled from "styled-components";

const ChatFrame = styled.div`
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  color: ${(props) => props.theme.colors.dark_grey};
`;

export default ChatFrame;
