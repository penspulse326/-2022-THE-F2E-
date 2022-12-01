import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, Slot } from "./Card";
import { ChatFrame } from "./ChatFrame";
import { ConfirmButton } from "./Buttons";
import { useState } from "react";

export function Stage3DropBox({
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DropContextWrapper>
        <Section>
          Scrum 流程圖
          <ScrumCircle />
          <Slot1 size="M">
            <DroppableContainer1>
              <Droppable droppableId="scrum1">
                {(provided, snapshot) => (
                  <OuterContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemObj.scrum1.items.map((item, index) => (
                      <Card item={item} index={index} key={item.id} size="M" />
                    ))}
                    {provided.placeholder}
                  </OuterContainer>
                )}
              </Droppable>
            </DroppableContainer1>
          </Slot1>
          <Slot2 size="M">
            <DroppableContainer2 droppableId="scrum2"></DroppableContainer2>
          </Slot2>
          <Slot3 size="M">
            <DroppableContainer3 droppableId="scrum3"></DroppableContainer3>
          </Slot3>
          <ListWrapper>
            <GameHintText>會議種類</GameHintText>
            <div>
              {
                <Droppable droppableId="outer">
                  {(provided, snapshot) => (
                    <OuterContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {itemObj.outer.items.map((item, index) => (
                        <Card
                          item={item}
                          index={index}
                          key={item.id}
                          size="M"
                        />
                      ))}
                      {provided.placeholder}
                    </OuterContainer>
                  )}
                </Droppable>
              }
            </div>
            <SlotWrapper>
              <Slot size="M" />
              <Slot size="M" />
              <Slot size="M" />
            </SlotWrapper>
          </ListWrapper>
        </Section>
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

const OuterContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 365px;
  height: 280px;

  box-sizing: border-box;

  z-index: 99;
`;

const DroppableContainer1 = styled.div`
  width: 360px;
  height: 72px;
`;
const DroppableContainer2 = styled(DroppableContainer1)``;
const DroppableContainer3 = styled(DroppableContainer1)``;

const Section = styled(ChatFrame)`
  position: relative;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 20px 10px;
  padding: 36px 10px;
  width: 1320px;
  height: 900px;

  font-weight: 700;
`;

const ScrumCircle = styled.img`
  content: url("./images/scrum.png");
`;

const SlotWrapper = styled.div`
  position: absolute;
  top: 54px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled.div`
  position: relative;
  top: -830px;
  left: 380px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;

  border: 2px dashed ${(props) => props.theme.colors.mid_grey};
  border-radius: 10px;
`;

const GameHintText = styled.div`
  margin: 10px 0;
  font-weight: 500;
  font-size: 20px;
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

const Slot1 = styled(Slot)`
  position: relative;
  top: -470px;
  left: -240px;

  background-color: rgba(255, 255, 255, 0.5);
  box-sizing: content-box;
`;

const Slot2 = styled(Slot1)`
  top: -270px;
  left: 30px;
`;

const Slot3 = styled(Slot1)`
  top: -356px;
  left: 410px;
`;
