
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";

import { Role } from "./roles.model.js";
import { Permission } from "./permissions.model.js";
import type { Optional } from "sequelize";


interface RolePermissionAttributes {
  roleId: string;
  permissionId: string;
  createdAt:Date;
  updatedAt:Date;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: Date | null;
}

interface RolePermissionCreationAttributes
  extends Optional<RolePermissionAttributes,"createdAt"|"updatedAt"|"createdBy"| "updatedBy"|"deletedAt"> {}

@Table({
  tableName: "role_permissions",
  timestamps: true,
  paranoid:true,
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ["roleId", "permissionId"],
  //   },
  // ],
})
export class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> {
  // @Column({
  //   type: DataType.UUID,
  //   defaultValue: DataType.UUIDV4,
  //   primaryKey: true,
  // })
  // declare id: string;
  @PrimaryKey
  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @PrimaryKey
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

  @Column({
  type: DataType.DATE,
  allowNull: true,
  })
  declare deletedAt: Date | null;

  @BelongsTo(() => Role)
  declare role: Role;

  @BelongsTo(() => Permission)
  declare permission: Permission;
}
