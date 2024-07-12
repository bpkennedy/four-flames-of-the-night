// app/hooks/useGameState.ts
import { useState, useCallback } from 'react'
import { Position, Enemy } from '../types'
import { keepInBounds } from '../utils/gameLogic'

const useGameState = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 })
  const [enemies, setEnemies] = useState<Enemy[]>([
    { type: 'Roller', position: { x: 100, y: 100 } },
    { type: 'Crawler', position: { x: 200, y: 200 } },
    { type: 'Snakeworm', position: { x: 300, y: 300 } },
  ])

  const movePlayer = useCallback((newPosition: Position) => {
    setPlayerPosition(prev => keepInBounds(newPosition))
  }, [])

  const updateEnemies = useCallback((updateFn: (prevEnemies: Enemy[]) => Enemy[]) => {
    setEnemies(updateFn)
  }, [])

  return { playerPosition, enemies, movePlayer, updateEnemies }
}

export default useGameState