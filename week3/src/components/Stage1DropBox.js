import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card } from "./Card";

export function Stage1DropBox({
  itemObj,
  setItemObj,
  answerAry,
  setIsOrderCorret,
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
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const DroppableContainer = styled.div`
  position: relative;
  top: 0;
  height: 349px;
  box-sizing: border-box;
`;

const SectionWrapper = styled.div`
  position: relative;
  top: -423px;
  width: 600px;
  height: 400px;
  z-index: 99;
  background-color: rgba(0, 255, 255, 0.5);
`;

const OutSectionWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 77;
  border: 10px solid red;
`;

const initPosition = [
  { x: "100px", y: "500px" },
  { x: "1100px", y: "700px" },
  { x: "1150px", y: "405px" },
  { x: "1200px", y: "510px" },
];
