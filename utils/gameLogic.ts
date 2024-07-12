// app/utils/gameLogic.ts
import { Position, Enemy, EnemyType } from '../types'

const MAP_WIDTH = 800
const MAP_HEIGHT = 600
const PLAYER_SIZE = 32
const ENEMY_SIZE = 32
const DETECTION_RADIUS = 100

export const isColliding = (pos1: Position, pos2: Position): boolean => {
  const dx = pos1.x - pos2.x
  const dy = pos1.y - pos2.y
  return Math.sqrt(dx * dx + dy * dy) < PLAYER_SIZE / 2 + ENEMY_SIZE / 2
}

export const moveTowardsPlayer = (enemyPos: Position, playerPos: Position): Position => {
  const dx = playerPos.x - enemyPos.x
  const dy = playerPos.y - enemyPos.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance < DETECTION_RADIUS) {
    const speed = 2
    return {
      x: enemyPos.x + (dx / distance) * speed,
      y: enemyPos.y + (dy / distance) * speed,
    }
  }

  return enemyPos
}

export const generateRandomPosition = (): Position => ({
  x: Math.random() * (MAP_WIDTH - ENEMY_SIZE),
  y: Math.random() * (MAP_HEIGHT - ENEMY_SIZE),
})

export const spawnEnemy = (type: EnemyType): Enemy => ({
  type,
  position: generateRandomPosition(),
})

export const updateEnemyPositions = (enemies: Enemy[], playerPos: Position): Enemy[] => {
  return enemies.map(enemy => ({
    ...enemy,
    position: moveTowardsPlayer(enemy.position, playerPos),
  }))
}

export const keepInBounds = (position: Position): Position => ({
  x: Math.max(0, Math.min(position.x, MAP_WIDTH - PLAYER_SIZE)),
  y: Math.max(0, Math.min(position.y, MAP_HEIGHT - PLAYER_SIZE)),
})
