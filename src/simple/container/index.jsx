import React from 'react'
import { useDrop } from 'react-dnd'

const Container = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop: () => ({ name: 'container' }),
      collect: (monitor) => {
        // container触发时机是box被drag的瞬间和box enter 和leave的时候
        console.log('container collect')
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
      hover:(item, monitor) => {
        console.log('hover')
      },
    }
  })

  return (
    <div
      ref={drop}
      style={{
        width: 800,
        height: 800,
        background: '#578',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      drop here
    </div>
  )
}

export default Container
