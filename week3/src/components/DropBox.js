import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, Slot } from "./Card";

export function DropBox({ itemObj, setItemObj, answerAry, setIsOrderCorret }) {
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
        <OutSectionWrapper>
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
                    firstDrag={firstDrag}
                    position={initPosition[item.priority - 1]}
                  />
                ))}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
        </OutSectionWrapper>
        <SectionWrapper>
          <Slot key={1} />
          <Slot key={2} />
          <Slot key={3} />
          <Slot key={4} />
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
                    position={false}
                  />
                ))}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
        </SectionWrapper>
      </DropContextWrapper>
    </DragDropContext>
  );
}

const DropContextWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const DroppableContainer = styled.div`
  position: absolute;
  top: 0;
  height: 349px;
  box-sizing: border-box;
`;

const SectionWrapper = styled.div`
  position: absolute;
  z-index: 99;
`;

const OutSectionWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 77;
`;

const initPosition = [
  { x: "150px", y: "250px" },
  { x: "1070px", y: "320px" },
  { x: "1100px", y: "30px" },
  { x: "1150px", y: "200px" },
];
