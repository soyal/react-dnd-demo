import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './index.css'

function throttle(fn) {
  let timer = null
  return (...args) => {
    if (timer) {
      return
    }
    timer = window.setTimeout(() => {
      fn(...args)
      timer = null
    }, 100)
  }
}

const DragItem = ({ value, index }) => {
  const ref = useRef()

  const [{ isDragging }, drag] = useDrag({
    type: 'songItem',
    item: {
      value,
      index,
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })

  const [{}, drop] = useDrop(() => {
    return {
      accept: 'songItem',
      hover: throttle((item, monitor) => {
        if (!ref.current || item.index === index) return

        const offset = monitor.getClientOffset()
        if (!offset) return
        const dropAreaRect = ref.current.getBoundingClientRect()
        const middleY = (dropAreaRect.top + dropAreaRect.bottom) / 2
        const mouseY = offset.y
        // down
        if (item.index < index && mouseY > middleY) {
          console.log('移位', 'dragged', item.index, 'drop', index)
          return
        }

        if (item.index > index && mouseY > middleY) {
          console.log('移位', 'dragged', item.index, 'drop', index)
          return
        }
      }),
    }
  })

  drop(drag(ref))

  return (
    <div
      className="drag-item"
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
      {value}
    </div>
  )
}

export default DragItem
