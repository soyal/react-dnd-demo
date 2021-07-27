import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

function throttle(fn) {
  let timer = null;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, 300);
  };
}

const DragItem = ({ value, index }) => {
  const ref = useRef();
  const [canDrag, setCanDrag] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    {
      type: "songItem",
      item: {
        value,
        index,
      },
      canDrag: () => {
        return canDrag;
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    [canDrag]
  );

  const [{}, drop] = useDrop(() => {
    return {
      accept: "songItem",
      hover: throttle((item, monitor) => {
        if (!ref.current || item.index === index) return;

        const offset = monitor.getClientOffset();
        if (!offset) return;
        const dropAreaRect = ref.current.getBoundingClientRect();
        const middleY = (dropAreaRect.top + dropAreaRect.bottom) / 2;
        const mouseY = offset.y;
        // down
        if (item.index < index && mouseY > middleY) {
          // do moveItem
          console.log("移位", "dragged", item.index, "drop", index);
          item.index = index
          return;
        }

        if (item.index > index && mouseY > middleY) {
          // do moveItem
          console.log("移位", "dragged", item.index, "drop", index);
          item.index = index
          return;
        }
      }),
    };
  });

  drop(drag(ref));

  return (
    <div
      className="drag-item"
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      onDragEnd={() => {
        console.log('drag end')
        setCanDrag(false);
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: 50,
          height: 50,
          cursor: "move",
          background: "red",
        }}
        onMouseDown={() => {
          setCanDrag(true);
        }}
      ></div>
      {value}
    </div>
  );
};

export default DragItem;
