import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
} from 'sequelize-typescript'
import { Reaction } from './Reaction'

@Table({ tableName: 'emoji', timestamps: false })
export class Emoji extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({ allowNull: false })
  declare code: string

  @HasMany(() => Reaction)
  declare reactions: Reaction[]
}
