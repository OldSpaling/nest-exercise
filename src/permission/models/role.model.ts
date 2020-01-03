import { RoleClaimModel } from "./role-claim.model";

export class RoleModel {
    public id?: number;

    public concurrencyStamp?: string;

    public name: string;

    public normalizedName: string;

    public description: string;

    // @ManyToMany((type) => User, (users) => users.roles)
    // public users: User[];

    public roleClaims: RoleClaimModel[];
}