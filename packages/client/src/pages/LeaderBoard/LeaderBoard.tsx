import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui'

import { LeaderboardService } from '@/shared/api/services/leaderbord-service'
import { LeaderBoardPlayerInfo } from '@/shared/api/services/leaderbord-service/types'
import { useSelector } from 'react-redux'
import { routesName } from '@/shared/configs/routes'
import { selectUser } from '@/shared/common/selectors'
import { toast } from 'react-toastify'

const Leaderboard: React.FC = () => {
  const userInfo = useSelector(selectUser)
  const [players, setPlayers] = useState<LeaderBoardPlayerInfo[]>([])

  const sortedPlayers = [...players].sort((a, b) => b.data.score - a.data.score)
  const currentPlayerIndex = sortedPlayers.findIndex(
    player => player.data.userId === userInfo?.id
  )
  const isPlayerFound = currentPlayerIndex !== -1

  useEffect(() => {
    const loadLeaderBoard = async () => {
      try {
        const response = await LeaderboardService.getLeaderboardData()
        setPlayers(response.data)
      } catch (error) {
        toast.error('Проблемы при загрузке лидерборда')
      }
    }
    void loadLeaderBoard()
  }, [])

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
                key={player.data.userName}
                className={`hover:bg-gray-100 ${
                  player.data.userId === userInfo?.id ? 'bg-[#f6e5b4]' : ''
                }`}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {player.data.userName}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {player.data.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-center">
        <p className="text-lg font-semibold">
          {userInfo && isPlayerFound
            ? `Ваш результат: ${players[currentPlayerIndex].data.score}`
            : `Ваш результат не был найден`}
        </p>
        <p className="text-lg font-semibold">
          {userInfo && isPlayerFound
            ? `Вы на ${currentPlayerIndex + 1}  месте!`
            : `Попробуй покорить вершину списка`}
        </p>
      </div>
    </div>
  )
}

export default Leaderboard
