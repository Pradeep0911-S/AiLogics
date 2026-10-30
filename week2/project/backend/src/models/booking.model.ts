
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import type { Optional } from "sequelize";
import { BOOKING_STATUS } from "../constants/bookingStatus.constant.js";
import { User } from "./users.model.js";
import { Service } from "./services.model.js";

interface BookingAttributes {
  id: string;
  customerId: string;
  service: string;
  serviceId: string;
  assignedUserId: string | null;
  status: string;
}

interface BookingCreationAttributes
  extends Optional<BookingAttributes, "id" | "assignedUserId"> {}

@Table({
  tableName: "bookings",
  timestamps: true,
  paranoid: true,
})
export class Booking extends Model<
  BookingAttributes,
  BookingCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare customerId: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare serviceId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare assignedUserId: string | null;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: BOOKING_STATUS.PENDING,
  })
  declare status: string;

  @Column({
    type: DataType.STRING(255),
    allowNull : true,
  })
  declare createdBy: string;

  @Column({
    type: DataType.STRING(255),
    allowNull : true ,
  })
  declare updatedBy: string;

  @BelongsTo(() => User, "customerId")
  declare customer: User;

  @BelongsTo(() => User, "assignedUserId")
  declare assignedUser: User;

  @BelongsTo(() => Service)
  declare service: Service;
}
