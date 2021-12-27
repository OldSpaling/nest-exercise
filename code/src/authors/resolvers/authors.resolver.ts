import { Args, Context, Directive, Info, Int, Mutation, Parent, Query, ResolveField, Resolver, Root, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { GetAuthorArgs, GetPaginatedAuthorArgs } from "../dto/get-author.args";
import { UpvotePostInput } from "../dto/post-post-input.args";
import { Author, PaginatedAuthor } from "../models/author.model";
import { EnumAllowColor, EnumModelTest } from "../models/enum.model";
import { Human } from "../models/human.model";
import { CompositionUpdateUserInput, CompositionUpdateUserResult, } from "../models/mapped-types-model";
import { Post } from "../models/post.model";
import { ResultUnion, UnionAuthor, UnionBook } from "../models/union.model";
import { AuthorService } from "../services/author.service";
import { PostService } from "../services/post.service";
type SubScriptionReturnType<T> = T | { [eventName: string]: T };
const pubSub = new PubSub();
/**
 * 方法中使用@parent()时 @Resolver()要传递@parent()的类型
 */
@Resolver(of => Author)
export class AuthorsResolver {
    constructor(
        private authorsService: AuthorService,
        private postService: PostService
    ) {

    }
    //#region Query
    // @Query(returns=>Author,{name:'author'})
    // async getAuthor(@Args('id', {type:()=>Int})id: number) {
    //     return this.authorsService.findOneById(id);
    // }
    /**
     * https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
     * @param args 参数信息
     * @param context 
     * An object shared across all resolvers that are executing for a particular operation
     * {req,res}&{server context func return value} :
     * context: async () => ({db: await client.connect(),})
     * 只在server初始化的context里处理需要的一步资源
    https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
     * @param info 
     * @param parent (@parent()) The return value of the resolver for this field's parent
     */
    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Query(returns => Author, { name: 'author' })
    async getAuthor(@Args() args: GetAuthorArgs, @Context() context, @Info() info, @Parent() p) {
        console.log("begin to run getAuthor");
        const result = await this.authorsService.findOneById(args.id);
        console.log("end to run getAuthor");
        // throw new Error("test");
        return result;
    }
    @Query(returns => [Author], { name: "authors" })
    async getAuthors(@Args() args: GetPaginatedAuthorArgs) {
        return this.authorsService.Authors.slice(args.offset, args.offset + args.limit);//.filter(o => o.lastName.includes("5"));
    }
    @Query(returns => PaginatedAuthor, { name: "pagedAuthors" })
    async getAuthorsWithPage(@Args() args: GetPaginatedAuthorArgs) {
        const result = new PaginatedAuthor();
        result.nodes = this.authorsService.Authors.slice(args.offset, args.offset + args.limit);
        result.edges = result.nodes.map(o => {
            return {
                cusor: `cusor${o.id}`,
                node: o
            };
        });
        result.totalCount = this.authorsService.Authors.length;
        result.hasNextPage = result.totalCount < args.offset + args.limit - 1;
        return result;
    }
    @ResolveField('posts', returns => [Post])
    async getPosts(@Parent() author: Author) {
        const { id } = author;
        return this.postService.findAll({ authorId: id });
    }
    //#endregion
    //#region Mutation for modified
    /**
     * test data:
     * mutation{
            upvotePost(upvotePostData:{postId:1,title:"test1"}){
                id,
                title
            }
        }
     * @param model 
     */
    @Mutation(returns => Post)
    async upvotePost(@Args('upvotePostData') model: UpvotePostInput) {
        return await this.postService.update({
            id: model.postId,
            title: model.title,
            votes: model.votes
        })
    }
    //#endregion
    //#region Subscription push msg from server to client
    /**
     * request data:subscription{
                        commentAdded1{
                            id,
                            title
                        }
                    }
     */
    @Subscription(returns => Post, {
        name: "commentAdded1",
        /**
         * @param payload 提交数据
         * @param variables 方法传递参数
         * @param context onConect 返回值
         */
        filter: (payload, variables, context) => {
            //payload publish data,
            //variables subscription params
            //true send msg to client
            //false unsend msg to client
            return payload.commentAdded1.title === variables.title
        },
        //filter也可以用this写法
        //this: AuthorsResolver 不写也可以 es5写法里面的this也是指向当前，知识为了智能导航
        resolve(payload, args, context) {
            return this.wrapperSubScriptionResult(payload, "commentAdded1");
        }
    })
    commentAdded(@Args('title', { nullable: true }) title: string) {

        return pubSub.asyncIterator('CommentAdded');
    }
    //from client to server
    @Mutation(returns => Post)
    async addComment(
        @Args("postId", { type: () => Int }) postId: number,
        @Args('comment', { type: () => UpvotePostInput }) comment: UpvotePostInput
    ) {
        const post = await this.postService.update({
            id: comment.postId,
            title: comment.title,
            votes: comment.votes
        });
        //commentAdded1:subscripe name
        pubSub.publish('CommentAdded', { commentAdded1: post });
        return post;
    }
    wrapperSubScriptionResult(model: SubScriptionReturnType<Post>, subscriptionName: string) {
        if (model[subscriptionName]) {
            return model[subscriptionName];
        } else {
            const result = {};
            result[subscriptionName] = model;
            return result;
        }
    }
    //#endregion    
    //#region interface
    //schema.gql只会生成有resolver引用的对象的SDL
    @Query(() => Human, { name: "queryIterface" })
    async queryInterface(@Args() args: GetAuthorArgs) {
        return <Human>{
            id: "12",
            name: "human_name"
        };
    }
    //#endregion
    //#region Unions 
    /**
     *  search{
            __typename//type最好写上
            ... on UnionBook {
                    title
            }
            ... on UnionAuthor {
                    name
            }

        }
     */
    @Query(() => [ResultUnion])
    search(): Array<typeof ResultUnion> {
        return [new UnionAuthor(), new UnionBook()]
    }
    //#endregion
    //#region Enum
    @Query(() => [EnumModelTest])
    testEnum(@Args() type: EnumModelTest) {
        return [new EnumModelTest(), type];
    }
    //#endregion
    //#region map type
    /**
     * query:
     * mutation maptype($model:CompositionUpdateUserInput!){
              testMapType(model:$model){
               test
                firstName
                lastName
              }
     }
     * @param model 
     */
    @Mutation(() => CompositionUpdateUserResult)
    async testMapType(@Args("model") model: CompositionUpdateUserInput) {
        return Object.assign(new CompositionUpdateUserResult, model, { test: "test map type" });
    }
    //#endregion
}