import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleClaimEntity } from "./role-claim.entity";

@Entity({ name: 'Roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn({ name: 'Id' })
    public id?: number;

    @Column({ name: 'ConcurrencyStamp', nullable: true })
    public concurrencyStamp?: string;

    @Column({ name: 'Name' })
    public name: string;

    @Column({ name: 'NormalizedName', unique: true, nullable: true })
    public normalizedName: string;

    @Column({ name: 'Description', nullable: true })
    public description: string;

    // @ManyToMany((type) => User, (users) => users.roles)
    // public users: User[];

    @OneToMany((type) => RoleClaimEntity, (roleClaim) => roleClaim.role)
    public roleClaims: RoleClaimEntity[];
}