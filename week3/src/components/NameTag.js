import styled from "styled-components";

const NameTag = styled.div`
  position: relative;
  height: 53px;
  width: 153px;
  border-radius: 30px;

  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  backdrop-filter: blur(15px);
  font-weight: 500;
  font-size: 32px;
  line-height: 180%;
  text-align: center;

  color: ${(props) => props.theme.colors.dark_grey};
`;

export default NameTag;
