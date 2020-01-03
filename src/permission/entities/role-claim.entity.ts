import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'RoleClaims' })
export class RoleClaimEntity {
    @PrimaryGeneratedColumn({ name: 'Id' })
    public id?: number;

    @Column({ name: 'ClaimType', comment: "action or menu or permission" })
    public claimType: string;

    @Column({ name: 'ClaimValue', comment: "actionId or menuId or permissionId" })
    public claimValue: string;

    @ManyToOne((type) => RoleEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'RoleId' })
    public role: RoleEntity;
}