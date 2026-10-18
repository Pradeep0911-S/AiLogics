
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { randomUUID } from "crypto";
import { User } from "./user.model.js";

@Table({
    tableName: "sessions",
    timestamps: true,
    paranoid: true,
})
export class Session extends Model {
    @PrimaryKey
    @Default(() => randomUUID())
    @Column({
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @BelongsTo(() => User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
    })
    declare user: User;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare refreshTokenHash: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    declare deviceName: string | null;

    @Column({
        type: DataType.STRING(45),
        allowNull: true,
    })
    declare ipAddress: string | null;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare expiresAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare revokedAt: Date | null;
}
