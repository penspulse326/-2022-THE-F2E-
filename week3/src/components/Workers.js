import styled from "styled-components";

export const Worker1 = styled.div`
  width: ${(props) => (props.size ? `${props.size * 383}px` : "383px")};
  height: ${(props) => (props.size ? `${props.size * 713}px` : "713px")};

  background: url("./images/worker_1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Worker2 = styled(Worker1)`
  width: ${(props) => (props.size ? `${props.size * 432}px` : "432px")};
  height: ${(props) => (props.size ? `${props.size * 662}px` : "662px")};

  background: url("./images/worker_2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Worker3 = styled(Worker1)`
  width: ${(props) => (props.size ? `${props.size * 383}px` : "383px")};
  height: ${(props) => (props.size ? `${props.size * 662}px` : "662px")};

  background: url("./images/worker_3.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Worker4 = styled(Worker1)`
  width: ${(props) => (props.size ? `${props.size * 383}px` : "383px")};
  height: ${(props) => (props.size ? `${props.size * 662}px` : "662px")};

  background: url("./images/worker_4.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  z-index: 99;
`;

export const NameTag = styled.div`
  position: relative;
  top: ${(props) => props.top};
  left: ${(props) => (props.tag === "right" ? "120px" : "-70px")};

  display: flex;
  justify-content: center;
  align-items: center;

  height: 53px;
  width: 153px;

  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);

  font-weight: 500;
  font-size: 30px;
  color: ${(props) => props.theme.colors.dark_grey};

  z-index: 99;
`;

export function NamedWorker({
  number,
  name,
  bottom = "0px",
  left = "1300px",
  tag = "right",
  tagTop = "10px",
}) {
  const style = {
    position: "fixed",
    bottom,
    left,
  };
  if (number === 1) tagTop = "40px";
  return (
    <div style={style}>
      <NameTag tag={tag} top={tagTop}>
        {name}
      </NameTag>
      {workerSelect[number - 1]}
    </div>
  );
}

const workerSelect = [
  <Worker1 size={0.575}></Worker1>,
  <Worker2 size={0.575}></Worker2>,
  <Worker3 size={0.575}></Worker3>,
  <Worker4 size={0.575}></Worker4>,
];
