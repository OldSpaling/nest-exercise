import { Injectable } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { PermissionEntity } from "../entities";

// @EntityRepository(PermissionEntity)
@Injectable()
export class PermissionService extends Repository<PermissionEntity> {

}