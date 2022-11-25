import styled from "styled-components";

export const ChatFrame = styled.div`
  position: absolute;
  padding: 70px 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  box-sizing: border-box;
  border-radius: 30px;
  color: ${(props) => props.theme.colors.dark_grey};

  font-size: 30px;
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
export const NormalDialog = styled(ChatFrame)`
  left: 300px;
  top: 5%;
`;

export const Loading = () => (
  <DotBox>
    <Dot />
    <Dot />
    <Dot />
  </DotBox>
);

const DotBox = styled(NormalDialog)`
  padding: 0;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 122px;
  width: 353px;
`;

const Dot = styled.div`
  height: 11px;
  width: 11px;
  border-radius: 100%;
  background: ${(props) => props.theme.colors.mid_grey};
  margin: 0 9px;
`;
