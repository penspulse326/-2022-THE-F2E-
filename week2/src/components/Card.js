import styled from "styled-components";

export default function Card({ item, index }) {
  return (
    <SnapCard>
      <Snap></Snap>
      <PageNumber>{index + 1}</PageNumber>
    </SnapCard>
  );
}

const SnapCard = styled.div`
  margin-top: 30px;
  width: 188px;
  height: 300px;

  border: 2px solid ${(props) => props.theme.mid_grey};
  border-radius: 5px;
`;

const Snap = styled.div`
  width: 100%;
  height: 268px;
  border-radius: 3px;
  background-color: aliceblue;
`;
const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.mid_grey};
  height: 32px;
  font-size: 18px;
`;
