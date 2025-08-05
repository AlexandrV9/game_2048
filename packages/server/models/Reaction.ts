import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript'

import { Emoji } from './Emoji'
import { Topic } from './Topic'

@Table({ timestamps: false })
export class Reaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  declare emojiId: number
  @BelongsTo(() => Emoji)
  emoji!: Emoji

  @Column
  authorLogin!: string

  @ForeignKey(() => Topic)
  @Column
  topicId!: number

  @BelongsTo(() => Topic)
  comment!: Topic
}
