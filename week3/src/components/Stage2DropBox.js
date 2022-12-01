import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, Slot } from "./Card";
import { ChatFrame } from "./ChatFrame";
import { ConfirmButton } from "./Buttons";
import { useState } from "react";

export function Stage2DropBox({
  itemObj,
  setItemObj,
  setIsTotalOK,
  handleCheck,
}) {
  const [totalPoints, setTotalPoints] = useState(0);
  const onDragEnd = (event) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    // 拷貝新的items (來自state)
    let newItemObj = { ...itemObj };

    // splice(start, deleteCount, item )
    // 從source剪下被拖曳的元素
    const [remove] = newItemObj[source.droppableId].items.splice(
      source.index,
      1
    );

    // 在destination位置貼上被拖曳的元素
    newItemObj[destination.droppableId].items.splice(
      destination.index,
      0,
      remove
    );

    // set state新的 itemObj
    setItemObj(newItemObj);

    // 確認短衝點數
    const checkTotalPoints = () => {
      let total = 0;
      newItemObj.inner.items.forEach((el) => (total += Number(el.point)));
      setTotalPoints(total);
      return total <= 20 && total > 0 ? true : false;
    };
    setIsTotalOK(checkTotalPoints);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DropContextWrapper>
        <Section1>
          產品待辦清單 ProductBacklog
          <GameHintText>優先度高↑</GameHintText>
          <SlotWrapper>
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </SlotWrapper>
          <GameHintText>優先度低↓</GameHintText>
          <Droppable droppableId="outer">
            {(provided, snapshot) => (
              <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {itemObj.outer.items.map((item, index) => (
                  <Card
                    item={item}
                    index={index}
                    key={item.id}
                    point={item.point}
                  />
                ))}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
        </Section1>
        <Section2>
          開發 A 組的短衝辦清單
          <GameHintTextDark>{totalPoints} / 20 點</GameHintTextDark>
          <SlotWrapper>
            <Slot color={"dk"} />
            <Slot color={"dk"} />
            <Slot color={"dk"} />
            <Slot color={"dk"} />
          </SlotWrapper>
          <Droppable droppableId="inner">
            {(provided, snapshot) => (
              <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {itemObj.inner.items.map((item, index) => (
                  <Card
                    item={item}
                    index={index}
                    key={item.id}
                    point={item.point}
                  />
                ))}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
          <Confirm
            content="準備好了，開始  Sprint"
            onClick={() => handleCheck()}
          />
        </Section2>
      </DropContextWrapper>
    </DragDropContext>
  );
}

const DropContextWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DroppableContainer = styled.div`
  position: absolute;
  top: 69px;
  margin-top: 124px;
  width: 600px;
  height: 364px;
  box-sizing: border-box;
`;

const Section1 = styled(ChatFrame)`
  position: relative;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 20px 10px;
  width: 688px;
  height: 900px;

  font-weight: 700;
`;

const Section2 = styled(Section1)`
  background-color: #fff8ba;
`;

const SlotWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameHintText = styled.div`
  margin: 20px 0;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.mid_grey};
`;

const GameHintTextDark = styled(GameHintText)`
  color: ${(props) => props.theme.colors.dark_grey};
`;

const Confirm = styled(ConfirmButton)`
  position: relative;

  margin-top: 50px;
  height: 80px;

  border-radius: 25px;
  font-size: 28px;
  cursor: pointer;

  align-self: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
