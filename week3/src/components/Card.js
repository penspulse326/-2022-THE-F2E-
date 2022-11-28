import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const DragItem = styled.div`
  position: absolute;
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

  transform: ${(props) =>
    props.snapshot.isDropAnimating ? `scale(1.2)` : `scale(1)`};
  transition: 0.3s;
`;

export const Card = ({ item, index, position }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        console.log(snapshot);
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
  border: 2px dashed ${(props) => props.theme.colors.mid_grey};
  box-sizing: border-box;
`;
