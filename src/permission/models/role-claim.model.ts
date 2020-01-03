import { RoleModel } from "./role.model";

export class RoleClaimModel {
    public id?: number;

    public claimType: string;

    public claimValue: string;

    public role: RoleModel;
}