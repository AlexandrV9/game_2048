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
import { Reaction } from './Reaction'

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

  @HasMany(() => Reaction)
  reactions!: Reaction[]
}
