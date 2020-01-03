import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionGroupEntity, PermissionEntity, RoleClaimEntity, RoleEntity } from './entities';
import { ActionGroupController, PermissionController, RoleController } from './controllers';
import { ActionGroupService, PermissionService, RoleService } from './services';

export const entities = [
    ActionGroupEntity,
    PermissionEntity,
    // RoleClaimEntity,
    // RoleEntity
];
const controllers = [
    ActionGroupController,
    PermissionController,
    RoleController
];
const providers = [
    ActionGroupService,
    PermissionService,
    RoleService
];
@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    controllers: [...controllers],
    providers: [...providers],
    exports: [...providers]
})
export class PermissionModule { };