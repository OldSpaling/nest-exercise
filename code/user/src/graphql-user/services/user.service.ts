import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.model";

@Injectable()
export class UserService {
    private readonly data: User[] = [];
    constructor() {
        for (let i = 0; i < 100; i++) {
            this.data.push(Object.assign(new User, <User>{
                id: i,
                name: `name${i}`
            }));
        }
    }
    async findById(id: number) {
        return this.data.find(o => o.id == id);
    }
}