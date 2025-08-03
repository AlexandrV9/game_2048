import { serverApi } from '../../core/BaseAPI'
import { LeaderBoardPlayerInfo, UserScore, UserScoreObj } from './types'

const LEADERBOARD_TEAM_NAME = '2048'
const LEADERBOARD_RATING_FIELD_NAME = 'score'

export class LeaderboardService {
  static setUserScore(data: UserScore) {
    return serverApi.post<UserScoreObj>('/leaderboard', {
      data: data,
      ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
      teamName: LEADERBOARD_TEAM_NAME,
    })
  }

  static getLeaderboardData() {
    return serverApi.post<LeaderBoardPlayerInfo[]>(
      `/leaderboard/${LEADERBOARD_TEAM_NAME}`,
      {
        ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
        cursor: 0,
        limit: 50,
      }
    )
  }
}
