import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'ActionGroups' })
export class ActionGroupEntity {
    @PrimaryGeneratedColumn({ name: 'Id' })
    id?: number;
    @Column({ name: 'Group' })
    group: string;
    @Column({ name: 'Route' })
    route: string;
    @Column({ name: 'Protocol' })
    protocol: string;
}