import { Args, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { User } from "../entities/user.model";
import { UserService } from "../services/user.service";

@Resolver((of)=>User)
export class UsersResolvers{
    constructor(private readonly userService: UserService) { }
    @Query(returns=>User)
    async getUser(@Args("id") id: number) {
        return await this.userService.findById(id);
    }
    @ResolveReference()
    async resolveReference(reference:{_typename:string,id:number}) {
        return await this.userService.findById(reference.id);
    }
}