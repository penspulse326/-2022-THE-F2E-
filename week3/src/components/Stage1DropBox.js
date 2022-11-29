import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, Slot } from "./Card";
import { ChatFrame } from "./ChatFrame";
import { ConfirmButton } from "../components/Buttons";

export function Stage1DropBox({
  itemObj,
  setItemObj,
  answerAry,
  setIsOrderCorret,
  handleCheck,
}) {
  const [firstDrag, setFirstDrag] = useState(false);
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

    // 確認productBacklog順序
    const checkProductBacklogOrder = () => {
      const currentProductBacklogOrder = newItemObj.inner.items.map((ele) => {
        return ele.priority;
      });
      return currentProductBacklogOrder.join("") === answerAry.join("")
        ? true
        : false;
    };
    setFirstDrag(true);
    setIsOrderCorret(checkProductBacklogOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DropContextWrapper>
        <Section1>
          項目清單 List
          <SlotWrapper>
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </SlotWrapper>
          <Droppable droppableId="outer">
            {(provided, snapshot) => (
              <DroppableContainer1
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {itemObj.outer.items.map((item, index) => (
                  <Card
                    item={item}
                    index={index}
                    key={item.id}
                    firstDrag={firstDrag}
                  />
                ))}
                {provided.placeholder}
              </DroppableContainer1>
            )}
          </Droppable>
        </Section1>
        <Section2>
          產品待辦清單 ProductBacklog
          <GameHintText>優先度高↑</GameHintText>
          <SlotWrapper>
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </SlotWrapper>
          <GameHintText>優先度低↓</GameHintText>
          <Droppable droppableId="inner">
            {(provided, snapshot) => (
              <DroppableContainer2
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {itemObj.inner.items.map((item, index) => (
                  <Card item={item} index={index} key={item.id} />
                ))}
                {provided.placeholder}
              </DroppableContainer2>
            )}
          </Droppable>
          <Confirm content="我完成了！" onClick={() => handleCheck()} />
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

const DroppableContainer1 = styled.div`
  position: absolute;
  top: 69px;
  margin-top: 15px;
  width: 600px;
  height: 300px;
  box-sizing: border-box;
`;

const DroppableContainer2 = styled(DroppableContainer1)`
  top: 178px;
`;

const Section1 = styled(ChatFrame)`
  position: relative;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 30px 40px 45px 40px;
  margin: 20px 10px;
  width: 688px;
  height: auto;

  font-weight: 700;
`;

const Section2 = styled(ChatFrame)`
  position: relative;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 20px 10px;
  width: 688px;
  height: 900px;

  font-weight: 700;
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

const Confirm = styled(ConfirmButton)`
  position: relative;

  margin-top: 20px;
  height: 80px;

  border-radius: 25px;
  font-size: 28px;
  cursor: pointer;

  align-self: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
