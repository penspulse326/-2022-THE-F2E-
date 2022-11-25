import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const DragItem = styled.div`
  position: ${(props) => (props.position ? "absolute" : "relative")};
  ${(props) =>
    !props.firstDrag &&
    `
    top: ${props.position.y};
    left: ${props.position.x};
  `}

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
  z-index: 99;

  transform: ${(props) => props.snapshot.isDragging && `scale(1.2)`};
`;

export const Card = ({ item, index, position }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            position={position}
          >
            {item.content}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export const Slot = styled.div`
  margin-bottom: 20px;
  width: 600px;
  height: 76px;
  left: 660px;
  top: 427px;
  border: 2px dashed ${(props) => props.theme.colors.mid_grey};
  box-sizing: border-box;
`;
