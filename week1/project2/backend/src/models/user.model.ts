import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    HasMany,
} from "sequelize-typescript";

import { randomUUID } from "crypto";
import { Session } from "./session.model.js";

@Table({
    tableName: "users",
    timestamps: true,
    paranoid:true,
})
export class User extends Model {
    @PrimaryKey
    @Default(() => randomUUID())
    @Column({
        type: DataType.UUID,
    })
    declare id: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    declare username: string;

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

    @HasMany(() => Session, {
    foreignKey: "userId",
    })
    declare sessions: Session[];
}
