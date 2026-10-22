import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";

import { Role } from "./roles.model.js";
import { RolePermission } from "./role.permission.model.js";

@Table({
  tableName: "permissions",
  timestamps: true,
  paranoid: true,
})
export class Permission extends Model<Permission> {
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

  @BelongsToMany(() => Role, () => RolePermission)
  declare roles: Role[];
}