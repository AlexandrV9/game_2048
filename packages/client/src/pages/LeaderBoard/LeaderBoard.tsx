import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'

const players = [
  { id: 1, name: 'Игрок 1', score: 150 },
  { id: 2, name: 'Игрок 2', score: 120 },
  { id: 3, name: 'Игрок 3', score: 180 },
  { id: 4, name: 'Игрок 4', score: 90 },
  { id: 5, name: 'Игрок 5', score: 200 },
  { id: 6, name: 'Игрок 1', score: 150 },
  { id: 7, name: 'Игрок 2', score: 120 },
  { id: 8, name: 'Игрок 3', score: 180 },
  { id: 9, name: 'Игрок 4', score: 90 },
  { id: 10, name: 'Игрок 5', score: 200 },
  { id: 11, name: 'Игрок 1', score: 150 },
  { id: 12, name: 'Игрок 2', score: 120 },
  { id: 13, name: 'Игрок 3', score: 180 },
  { id: 14, name: 'Игрок 4', score: 90 },
  { id: 15, name: 'Игрок 5', score: 200 },
  { id: 16, name: 'Игрок 1', score: 150 },
  { id: 17, name: 'Игрок 2', score: 120 },
  { id: 18, name: 'Игрок 3', score: 180 },
  { id: 19, name: 'Игрок 4', score: 90 },
  { id: 20, name: 'Игрок 5', score: 200 },
]

const currentPlayer = { id: 1, name: 'Игрок 1', score: 150 } // Пример текущего игрока

const Leaderboard: React.FC = () => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const currentPlayerIndex =
    sortedPlayers.findIndex(player => player.id === currentPlayer.id) + 1

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#fbfbe9] p-5 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Таблица лидеров</h1>
        <Button>
          <Link to={routesName.home}>Вернуться на главную</Link>
        </Button>
      </div>

      <div className="overflow-y-auto max-h-[60vh] border border-gray-300">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Имя</th>
              <th className="py-2 px-4 border-b">Очки</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className={`hover:bg-gray-100 ${
                  player.id === currentPlayer.id ? 'bg-[#f6e5b4]' : ''
                }`}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {player.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {player.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-center">
        <p className="text-lg font-semibold">
          Ваш результат: {currentPlayer.score}
        </p>
        <p className="text-lg font-semibold">
          Вы на {currentPlayerIndex} месте!
        </p>
      </div>
    </div>
  )
}

export default Leaderboard
