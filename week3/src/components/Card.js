import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const DragItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 28px;
  width: ${(props) => (props.size ? "365px" : "600px")};
  height: 76.16px;
  margin-bottom: ${(props) => (props.size ? "10px" : "20px")};

  background-color: #d7ffae;
  color: ${(props) => props.theme.colors.dark_grey};
  font-size: 20px;

  box-sizing: border-box;
  border: 1.5px solid ${(props) => props.theme.colors.dark_grey};
`;

export const Card = ({ item, index, point = null, size = null }) => {
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
    <Draggable draggableId={item?.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            size={size}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            {item?.content}
            {point && <Point>{point}</Point>}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export const Slot = styled.div`
  margin: ${(props) => (props.size ? "5px" : "10px")};
  width: ${(props) => (props.size ? "365px" : "600px")};
  height: 76px;
  border: 2px dashed
    ${(props) =>
      props.color === "dk"
        ? props.theme.colors.dark_grey
        : props.theme.colors.mid_grey};
  box-sizing: border-box;
`;

const Point = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: #ffffff;
  border: 2px solid #8e7e74;
  border-radius: 50%;
`;
