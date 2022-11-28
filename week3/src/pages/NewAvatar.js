import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ConfirmButton } from "../components/Buttons";
import MaskHint from "../components/MaskHint";
import { useUser } from "../contexts/UserContext";
import { pageTransition } from "../utils";

export default function NewAvatarPage() {
  const [data, setData] = useState({ gender: null, name: "" });
  const [error, setError] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setData((state) => ({ ...state, gender: e.target.getAttribute("data") }));
  };

  const handleChange = (e) => {
    setData((state) => ({ ...state, name: e.target.value }));
  };

  const handleClick = () => {
    if (data.gender && data.name) {
      setUser({ ...data });
      pageTransition("body", navigate, "/stage1");
    } else {
      setError(true);
    }
  };

  return (
    <Wrapper>
      <Title>請選擇代表你的角色</Title>
      <AvatarWrapper>
        <Male
          gender={data.gender}
          data="male"
          onClick={(e) => handleSelect(e)}
        ></Male>
        <Female
          gender={data.gender}
          data="female"
          onClick={(e) => handleSelect(e)}
        ></Female>
      </AvatarWrapper>
      <InputName
        placeholder="請輸入你的名字。"
        value={data.name}
        onChange={(e) => handleChange(e)}
      />
      <Confirm content="確定" onClick={() => handleClick()}></Confirm>
      {error && (
        <MaskHint
          name={"？？？"}
          content={`嘿！菜鳥！
          不打算報上名字和身分嗎？
          `}
          btnText={"好的"}
          toggle={setError}
          onStage={false}
        ></MaskHint>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
`;

const Title = styled.div`
  position: absolute;
  top: 64px;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  color: ${(props) => props.theme.colors.dark_grey};
`;

const Male = styled.button`
  margin: 0 134px;
  height: 383px;
  width: 220px;

  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;

  transition: 0.3s;

  &:hover {
    background-image: url("./images/male.png");
    color: transparent;
    transition: 0.3s;
    cursor: pointer;
  }

  background-image: ${(props) =>
    props.data === props.gender
      ? 'url("./images/male.png")'
      : 'url("./images/male_shadow.png")'};
`;

const Female = styled(Male)`
  height: 411px;
  line-height: 250px;

  &:hover {
    background-image: url("./images/female.png");
    color: transparent;
    transition: 0.3s;
  }

  background-image: ${(props) =>
    props.data === props.gender
      ? 'url("./images/female.png")'
      : 'url("./images/female_shadow.png")'};
`;

const InputName = styled.input`
  margin-top: 100px;
  padding: 0 66px;
  height: 90px;
  width: 525px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 30px;
  font-weight: 500;
  font-size: 32px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.dark_grey};

  &::placeholder {
    font-weight: 700;
    font-size: 32px;
    color: ${(props) => props.theme.colors.mid_grey};
  }

  &:focus {
    border-color: transparent;
    outline: 4px solid ${(props) => props.theme.colors.secondary};
  }
`;

const AvatarWrapper = styled.div`
  margin-top: 128px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Confirm = styled(ConfirmButton)`
  margin-top: 30px;
`;
