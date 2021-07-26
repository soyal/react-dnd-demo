import React, { useState } from 'react'
import DragItem from './drag-item'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DragList = () => {
  const [list, setList] = useState([
    {
      id: 1,
      value: '1111111',
    },
    {
      id: 2,
      value: '2222222',
    },
    {
      id: 3,
      value: '333333',
    },
  ])

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: 600,
          margin: '300px auto 0',
        }}
      >
        {list.map((item, index) => (
          <DragItem key={item.id} value={item.value} index={index}></DragItem>
        ))}
      </div>
    </DndProvider>
  )
}

export default DragList
