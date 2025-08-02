import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript'

import { Comment } from './Comment'

@Table({ timestamps: false })
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  topic!: string

  @Column({ type: DataType.DATE })
  created!: Date

  @Column
  authorLogin!: string

  @HasMany(() => Comment)
  comments!: Comment[]
}
