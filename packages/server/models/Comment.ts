import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsTo as BelongsToRelation,
} from 'sequelize-typescript'

import { Topic } from './Topic'

@Table({ timestamps: false })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  content!: string

  @Column({ type: 'TIMESTAMP' })
  created!: Date

  @Column
  authorLogin!: string

  @ForeignKey(() => Topic)
  @Column
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @ForeignKey(() => Comment)
  @Column
  parentCommentId?: number

  @BelongsToRelation(() => Comment, {
    foreignKey: 'parentCommentId',
  })
  parentComment?: Comment

  @HasMany(() => Comment, {
    foreignKey: 'parentCommentId',
  })
  childComments?: Comment[]
}
