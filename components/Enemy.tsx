// app/components/Enemy.tsx
import React, { useEffect, useState } from 'react'
import { Position, EnemyType } from '../types'

interface EnemyProps {
  type: EnemyType
  position: Position
  onCollision: () => void
}

const Enemy: React.FC<EnemyProps> = ({ type, position, onCollision }) => {
  const [color, setColor] = useState('bg-red-500')

  useEffect(() => {
    switch (type) {
      case 'Roller':
        setColor('bg-red-500')
        break
      case 'Crawler':
        setColor('bg-green-500')
        break
      case 'Snakeworm':
        setColor('bg-yellow-500')
        break
    }
  }, [type])

  return (
    <div
      className={`absolute w-8 h-8 ${color} rounded-full`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 0.5s',
      }}
      onClick={onCollision}
    />
  )
}

export default Enemy
