import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";

import { Role } from "./roles.model.js";
import { RolePermission } from "./role.permission.model.js";
import type { Optional } from "sequelize";


interface PermissionAttributes {
  id: string;
  name: string;
  createdBy: string | null;
  updatedBy: string | null;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id"|"createdBy"| "updatedBy"> {}

@Table({
  tableName: "permissions",
  timestamps: true,
  paranoid: true,
})
export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> {
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

  @BelongsToMany(() => Role, () => RolePermission)
  declare roles: Role[];
}