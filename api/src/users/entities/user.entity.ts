import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true, default: null })
    email?: string

    @Column({ nullable: true, default: null })
    displayName?: string

    @Column({ select: false, nullable: true, default: null })
    passwordHash?: string

    @Column({ default: UserRole.User })
    role: UserRole

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}