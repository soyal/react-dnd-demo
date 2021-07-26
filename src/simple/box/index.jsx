import React from 'react'
import { useDrag } from 'react-dnd'

const Box = () => {
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'box',
      item: {
        name: 'a',
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          console.log(`You dropped ${item.name} into ${dropResult.name}!`)
        }
      },
      collect: (monitor) => {
        // box collect触发时机是物体被drag和被drop的瞬间
        console.log('box collect isDragging', monitor.isDragging())
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }
  })

  return (
    <div
      ref={drag}
      style={{
        width: 100,
        height: 100,
        border: '2px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      DragMe
    </div>
  )
}

export default Box
