import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";

@Entity({ name: 'Permissions' })
export class PermissionEntity {
    @PrimaryGeneratedColumn({ name: 'Id' })
    id?: number;
    @Column({ name: 'Name' })
    name: string;
    @Column({ name: 'Type' })
    type: string;
    @Column({ name: 'NagigateUrl' })
    navigateUrl: string;
    @Column({ name: 'MenuImg' })
    menuImg: string;
    @Column({ name: 'AppId' })
    appId: string;
    // @ManyToOne((type) => PermissionEntity, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'ParentId' })
    // public Parent: PermissionEntity;
    // @ManyToOne(type => PermissionEntity, permission => permission.children, { onDelete: 'CASCADE' })
    // // @JoinColumn({ name: 'ParentId' })
    // parent: PermissionEntity;

    // @OneToMany(type => PermissionEntity, permission => permission.parent, { onDelete: 'CASCADE' })
    // children: PermissionEntity[];
}