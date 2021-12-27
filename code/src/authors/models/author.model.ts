import { Directive, Extensions, Field, Int, ObjectType } from "@nestjs/graphql";
import { extensionMiddleware } from "../../common/field-middleware/extension.middleware";
import { loggerMiddleware } from "../../common/field-middleware/logger-field-middleware";
import { People } from "../../common/scalars/people.scalar";
import { Paginated } from "./pager.model";
import { Post } from './post.model';

@ObjectType({ description: "author" })
export class Author {
    @Field(type => Int, { middleware: [loggerMiddleware] })
    id: number;
    @Field({ nullable: true, middleware: [loggerMiddleware, extensionMiddleware] })
    @Extensions({ test: "test Extensions Decorator " })
    @Extensions({ test: "test Extensions Decorator2 " })
    firstName?: string;
    @Directive('@upper')
    @Field({ nullable: true })
    lastName?: string;
    @Field({ nullable: true })
    birthTime: Date;
    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Field(type => People, { nullable: true })
    people: People;
    //{nullable:"items"} 数组元素可为空
    //{nullable:"itemsAndList"} 数据元素和数组都可为空
    @Field(type => [Post])
    posts: Post[];
    @Field({ nullable: true })
    a?: string;
}
@ObjectType({ description: "PageinatedAuthor" })
export class PaginatedAuthor extends Paginated(Author) {

}