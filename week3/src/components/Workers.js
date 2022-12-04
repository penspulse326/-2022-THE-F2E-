import styled from "styled-components";

export const Worker1 = styled.div`
  width: 382px;
  height: 713px;
  background: url("./images/worker_1.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;

  ${(props) => props.size && `transform: scale(${props.size})`}
`;

export const Worker2 = styled(Worker1)`
  width: 432px;
  height: 713px;

  background: url("./images/worker_2.png");
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Worker3 = styled(Worker1)`
  width: 383px;
  height: 713px;

  background: url("./images/worker_3.png");
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Worker4 = styled(Worker1)`
  width: 382px;
  height: 713px;

  background: url("./images/worker_4.png");
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 99;
`;

export const NameTag = styled.div`
  position: relative;
  top: ${(props) => props.top};
  left: ${(props) => (props.tag === "right" ? "200px" : "20px")};

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
  bottom = "-175px",
  left = "1180px",
  tag = "right",
  tagTop = "190px",
}) {
  const style = {
    position: "fixed",
    bottom,
    left,
  };
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
