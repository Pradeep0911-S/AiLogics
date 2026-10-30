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

@Table({
  tableName: "roles",
  timestamps: true,
  paranoid: true,
})
export class Role extends Model<Role> {
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
    type: DataType.STRING(255),
    allowNull : true,
  })
  declare createdBy: string;

  @Column({
    type: DataType.STRING(255),
    allowNull : true ,
  })
  declare updatedBy: string;

  @HasMany(() => User)
  declare users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  declare permissions: Permission[];
}