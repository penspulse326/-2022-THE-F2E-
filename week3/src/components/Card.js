import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const DragItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 32px;
  width: 600px;
  height: 76.16px;
  margin-bottom: 20px;

  background-color: #d7ffae;
  color: ${(props) => props.theme.colors.dark_grey};
  font-size: 20px;

  box-sizing: border-box;
  border: 1.5px solid ${(props) => props.theme.colors.dark_grey};
`;

export const Card = ({ item, index }) => {
  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return {
        ...style,
        background: snapshot.isDragging && "#f7ca56",
        color: snapshot.isDragging && "#555",
      };
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;

    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

    return {
      ...style,
      transform: `${translate} scale(1.1)`,
      transition: `all ${curve} ${duration + 0.2}s`,
    };
  }
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            {item.content}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export const Slot = styled.div`
  margin: 10px;
  width: 600px;
  height: 76px;
  border: 2px dashed ${(props) => props.theme.colors.mid_grey};
  box-sizing: border-box;
`;
