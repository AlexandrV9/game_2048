import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

import { Comment } from './Comment'

@Table({ timestamps: false })
export class Reaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  emodji!: string

  @Column
  authorLogin!: string

  @ForeignKey(() => Comment)
  @Column
  commentId!: number

  @BelongsTo(() => Comment)
  comment!: Comment
}
