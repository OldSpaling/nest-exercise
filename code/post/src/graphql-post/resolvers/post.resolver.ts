import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "../entities/post.model";
import { User } from "../entities/user.model";
import { PostService } from "../services/post.service";

@Resolver(Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {

    }
    @Query((returns) => Post)
    findPost(@Args({ name: "id", type: () => Int }) id: number) {
        return this.postService.findOne(id);
    }
    @Query((returns) => [Post])
    getPosts() {
        return this.postService.all();
    }
    // @ResolveField((of) => User)
    // user(@Parent() post: Post) {
    //     return { _typename: User.name, id: post.authorId };
    // }
}