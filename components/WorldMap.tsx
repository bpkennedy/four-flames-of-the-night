// app/components/WorldMap.tsx
import { useEffect } from 'react'
import Player from '../components/Player'
import Enemy from '../components/Enemy'
import useGameState from '../hooks/useGameState'
import { Position, EnemyType } from '../types'
import { isColliding, updateEnemyPositions } from '../utils/gameLogic'

interface WorldMapProps {
  onStartBattle: (enemyType: EnemyType) => void
}

const WorldMap: React.FC<WorldMapProps> = ({ onStartBattle }) => {
  const { playerPosition, enemies, movePlayer, updateEnemies } = useGameState()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const step = 10
      let newPosition: Position = { ...playerPosition }
      switch (e.key) {
        case 'a': newPosition.x -= step; break
        case 'w': newPosition.y -= step; break
        case 'd': newPosition.x += step; break
        case 's': newPosition.y += step; break
        default: return; // If it's not one of these keys, don't do anything
      }
      movePlayer(newPosition)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePlayer, playerPosition])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateEnemies(prevEnemies => updateEnemyPositions(prevEnemies, playerPosition))
    }, 100)

    return () => clearInterval(gameLoop)
  }, [updateEnemies, playerPosition])

  useEffect(() => {
    enemies.forEach(enemy => {
      if (isColliding(playerPosition, enemy.position)) {
        onStartBattle(enemy.type)
      }
    })
  }, [enemies, playerPosition, onStartBattle])

  return (
    <div className="relative w-full h-full bg-gray-100">
      <Player position={playerPosition} />
      {enemies.map((enemy, index) => (
        <Enemy
          key={index}
          type={enemy.type}
          position={enemy.position}
          onCollision={() => onStartBattle(enemy.type)}
        />
      ))}
    </div>
  )
}

export default WorldMap
