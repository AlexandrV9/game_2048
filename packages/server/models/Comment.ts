import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
} from 'sequelize-typescript'

import { Topic } from './Topic'
import { Reply } from './Reply'

@Table({ timestamps: false })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  content!: string

  @Column({ type: DataType.DATE })
  created!: Date

  @Column
  authorLogin!: string

  @ForeignKey(() => Topic)
  @Column
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @HasMany(() => Reply)
  replies!: Reply[]
}
