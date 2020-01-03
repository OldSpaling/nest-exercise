import { Injectable } from "@nestjs/common";
import { ActionGroupEntity } from "../entities";
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ActionGroupService {
    constructor(
        @InjectRepository(ActionGroupEntity)
        public repository: Repository<ActionGroupEntity>
    ) {
    }
}