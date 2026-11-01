
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Role } from "./roles.model.js";
import { Permission } from "./permissions.model.js";
import type { Optional } from "sequelize";


interface RolePermissionAttributes {
  id: string;
  roleId: string;
  permissionId: string;
  createdBy: string | null;
  updatedBy: string | null;
}

interface RolePermissionCreationAttributes
  extends Optional<RolePermissionAttributes, "id"|"createdBy"| "updatedBy"> {}

@Table({
  tableName: "role_permissions",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["roleId", "permissionId"],
    },
  ],
})
export class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare permissionId: string;
  @Column({
    type: DataType.UUID,
    allowNull: true, 
  })
  declare createdBy: string | null;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare updatedBy: string | null;

  @BelongsTo(() => Role)
  declare role: Role;

  @BelongsTo(() => Permission)
  declare permission: Permission;
}
