
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import type { Optional } from "sequelize";

import { Role } from "./roles.model.js";
import { Booking } from "./booking.model.js";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleId: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isActive"> {}

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare isActive: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @BelongsTo(() => Role)
  declare role: Role;

  @HasMany(() => Booking, "customerId")
  declare customerBookings: Booking[];

  @HasMany(() => Booking, "assignedUserId")
  declare assignedBookings: Booking[];
}
