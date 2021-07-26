import React from 'react'
import Container from './container'
import Box from './box'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const SimpleDemo = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Container></Container>
        <Box></Box>
      </div>
    </DndProvider>
  )
}

export default SimpleDemo