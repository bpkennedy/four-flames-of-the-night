// app/types/index.ts
export type Position = {
  x: number
  y: number
}

export type EnemyType = 'Roller' | 'Crawler' | 'Snakeworm'

export type Enemy = {
  type: EnemyType
  position: Position
}

export type GameState = 'world' | 'battle'

export type Direction = 'up' | 'down' | 'left' | 'right'
