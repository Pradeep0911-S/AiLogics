
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
export class RolePermission extends Model<RolePermission> {
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

  @BelongsTo(() => Role)
  declare role: Role;

  @BelongsTo(() => Permission)
  declare permission: Permission;
}
