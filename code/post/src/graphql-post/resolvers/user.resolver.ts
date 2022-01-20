import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "../entities/post.model";
import { User } from "../entities/user.model";
import { PostService } from "../services/post.service";

@Resolver(User)
export class UserResolver {
    constructor(private readonly postService: PostService) {

    }
    @ResolveField((of) => [Post])
    public posts(@Parent() user: User) {
        return this.postService.forAuthor(user.id);
    }
    @ResolveField("test",(of) => String)
    getTest(@Parent() user: User) {
        return "test";
    }
}