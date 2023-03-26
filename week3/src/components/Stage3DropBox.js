import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, Slot } from "./Card";
import { ChatFrame } from "./ChatFrame";
import { ConfirmButton } from "./Buttons";

export function Stage3DropBox({
  itemObj,
  setItemObj,
  setIsProrityOK,
  handleCheck,
}) {
  const onDragEnd = (event) => {
    const { source, destination } = event;
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // 拷貝新的items (來自state)
    let newItemObj = { ...itemObj };

    // splice(start, deleteCount, item )
    // 從source剪下被拖曳的元素
    // 第三關 itemObj 內容有陣列和物件 依照 destination 設計方法
    let remove = null;

    if (source.droppableId === "outer") {
      [remove] = newItemObj[source.droppableId].items.splice(source.index, 1);
    } else {
      remove = newItemObj[source.droppableId].item;
    }

    if (destination.droppableId === "outer") {
      newItemObj["outer"].items.push(remove);
    } else {
      if (newItemObj[destination.droppableId].item)
        newItemObj["outer"].items.push(
          newItemObj[destination.droppableId].item
        );
      newItemObj[destination.droppableId].item = remove;
    }
    newItemObj[source.droppableId].item = null;

    // set state新的 itemObj
    const checkPriority = () =>
      newItemObj.scrum1.item?.priority === 1 &&
      newItemObj.scrum2.item?.priority === 2 &&
      newItemObj.scrum3.item?.priority === 3;

    setItemObj(newItemObj);
    setIsProrityOK(checkPriority());
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DropContextWrapper>
        <Section>
          Scrum 流程圖
          <ScrumCircle />
          <Slot1 size="M">
            <DroppableContainer>
              <Droppable droppableId="scrum1">
                {(provided, snapshot) => (
                  <OuterContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemObj.scrum1.item && (
                      <Card item={itemObj.scrum1.item} index={0} size="M" />
                    )}
                    {provided.placeholder}
                  </OuterContainer>
                )}
              </Droppable>
            </DroppableContainer>
          </Slot1>
          <Slot2 size="M">
            <DroppableContainer droppableId="scrum2">
              <Droppable droppableId="scrum2">
                {(provided, snapshot) => (
                  <OuterContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemObj.scrum2.item && (
                      <Card item={itemObj.scrum2.item} index={0} size="M" />
                    )}
                    {provided.placeholder}
                  </OuterContainer>
                )}
              </Droppable>
            </DroppableContainer>
          </Slot2>
          <Slot3 size="M">
            <DroppableContainer droppableId="scrum3">
              <Droppable droppableId="scrum3">
                {(provided, snapshot) => (
                  <OuterContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemObj.scrum3.item && (
                      <Card item={itemObj.scrum3.item} index={0} size="M" />
                    )}
                    {provided.placeholder}
                  </OuterContainer>
                )}
              </Droppable>
            </DroppableContainer>
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
          <Confirm content="我完成了！" onClick={() => handleCheck()} />
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

const DroppableContainer = styled.div`
  width: 360px;
  height: 72px;
`;

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
  position: absolute;
  top: 50px;
  left: 875px;

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

  margin-top: 45px;
  height: 80px;

  border-radius: 25px;
  font-size: 28px;
  cursor: pointer;

  align-self: center;

  z-index: 99;
`;

const Slot1 = styled(Slot)`
  position: absolute;
  top: 130px;
  left: 225px;

  background-color: rgba(255, 255, 255, 0.5);
  box-sizing: content-box;
`;

const Slot2 = styled(Slot1)`
  top: 430px;
  left: 500px;
`;

const Slot3 = styled(Slot1)`
  top: 430px;
  left: 880px;
`;
