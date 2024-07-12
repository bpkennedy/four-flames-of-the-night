// app/components/Battle.tsx
import { useState, useEffect } from 'react'
import { EnemyType } from '../types'

interface BattleProps {
  enemyType: EnemyType
  onEndBattle: () => void
}

const Battle: React.FC<BattleProps> = ({ enemyType, onEndBattle }) => {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)

  useEffect(() => {
    if (playerHealth <= 0 || enemyHealth <= 0) {
      setTimeout(onEndBattle, 2000)
    }
  }, [playerHealth, enemyHealth, onEndBattle])

  const attack = () => {
    setEnemyHealth(prev => Math.max(0, prev - 20))
    if (enemyHealth > 0) {
      setTimeout(() => setPlayerHealth(prev => Math.max(0, prev - 15)), 1000)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2>Battle against {enemyType}</h2>
      <div>Player Health: {playerHealth}</div>
      <div>Enemy Health: {enemyHealth}</div>
      <button onClick={attack}>Attack</button>
    </div>
  )
}

export default Battle
