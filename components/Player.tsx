// app/components/Player.tsx
import React from 'react'
import { Position } from '../types'

interface PlayerProps {
  position: Position
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-blue-500 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 0.1s',
      }}
    />
  )
}

export default Player
