// app/page.tsx
'use client'

import { useState } from 'react'
import WorldMap from '../components/WorldMap'
import Battle from '../components/Battle'
import { GameState, EnemyType } from '../types'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('world')
  const [currentEnemy, setCurrentEnemy] = useState<EnemyType | null>(null)

  const startBattle = (enemyType: EnemyType) => {
    setGameState('battle')
    setCurrentEnemy(enemyType)
  }

  const endBattle = () => {
    setGameState('world')
    setCurrentEnemy(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {gameState === 'world' ? (
        <WorldMap onStartBattle={startBattle} />
      ) : currentEnemy ? (
        <Battle enemyType={currentEnemy} onEndBattle={endBattle} />
      ) : null}
    </main>
  )
}
