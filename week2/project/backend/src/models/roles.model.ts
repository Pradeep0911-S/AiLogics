import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";

import { User } from "./users.model.js";
import { Permission } from "./permissions.model.js";
import { RolePermission } from "./role.permission.model.js";
import type { Optional } from "sequelize";

interface RoleAttributes {
  id: string;
  name: string;
  createdBy: string | null;
  updatedBy: string | null;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"|"createdBy"| "updatedBy"> {}

@Table({
  tableName: "roles",
  timestamps: true,
  paranoid: true,
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(50),
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

  @HasMany(() => User)
  declare users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  declare permissions: Permission[];
}