export interface UserScoreObj {
  data: UserScore
  ratingFieldName: string
  teamName: string
}

export interface LeaderBoardPlayerInfo {
  data: UserScore
}

export interface UserScore {
  userName: string
  userId: string | number
  score: number
}
