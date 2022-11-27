import styled from "styled-components";

export const Worker1 = styled.div`
  width: 382px;
  height: 713px;

  background: url("./images/worker_1.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Worker2 = styled(Worker1)`
  width: 432px;
  height: 662px;

  background: url("./images/worker_2.png");
`;

export const Worker3 = styled(Worker1)`
  width: 383px;
  height: 662px;

  background: url("./images/worker_3.png");
`;

export const Worker4 = styled(Worker1)`
  width: 382px;
  height: 662px;

  background: url("./images/worker_4.png");
`;

export function namedWorker(worker, onStage = true) {
  const innerWorker = workerMap.get(worker);
  const SmallWorker = styled(innerWorker)`
    background-repeat: no-repeat;
    background-size: contain;
    transform: scale(0.575);
  `;
  return (
    <WorkerWrapper>
      <NameTag>{onStage ? worker : "？？？"}</NameTag>
      <SmallWorker />
    </WorkerWrapper>
  );
}

const WorkerWrapper = styled.div`
  position: fixed;
  left: 1200px;
  bottom: -170px;
`;

const workerMap = new Map([
  ["小斯", Worker1],
  ["小敏", Worker2],
  ["小凱", Worker3],
  ["小捷", Worker4],
]);

const NameTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 53px;
  width: 153px;
  top: 150px;
  left: 200px;
  border-radius: 30px;

  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(116, 48, 48, 0.4);
  backdrop-filter: blur(15px);
  font-weight: 500;
  font-size: 32px;
  line-height: 180%;

  color: ${(props) => props.theme.colors.dark_grey};

  z-index: 99;
`;
