export class PermissionModel {
    id?: number;
    name: string;
    type: string;
    navigateUrl: string;
    menuImg: string;
    appId: string;
    Parent: PermissionModel;
}