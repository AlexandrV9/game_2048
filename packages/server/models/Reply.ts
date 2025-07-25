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

import { Comment } from './Comment'

@Table({ timestamps: false })
export class Reply extends Model {
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

  @ForeignKey(() => Comment)
  @Column
  commentId!: number

  @BelongsTo(() => Comment)
  comment!: Comment
}
