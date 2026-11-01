
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from "sequelize-typescript";

import type { Optional } from "sequelize";
import { Booking } from "./booking.model.js";

interface ServiceAttributes {
  id: string;
  name: string;
  createdBy: string | null;
  updatedBy: string | null;
}

interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, "id"|"createdBy"| "updatedBy"> {}

@Table({
  tableName: "services",
  timestamps: true,
  paranoid: true,
})
export class Service extends Model<
  ServiceAttributes,
  ServiceCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.UUID,
    allowNull : true,
  })
  declare createdBy: string | null;

  @Column({
    type: DataType.UUID,
    allowNull : true ,
  })
  declare updatedBy: string | null;

  @HasMany(() => Booking)
  declare bookings: Booking[];
}
