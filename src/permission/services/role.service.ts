import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RoleEntity } from "../entities";

// @EntityRepository(RoleEntity)
@Injectable()
export class RoleService extends Repository<RoleEntity> {
}