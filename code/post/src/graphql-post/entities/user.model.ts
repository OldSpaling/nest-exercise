import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "./post.model";

@ObjectType()
//apollo 里没啥用 只是为了兼容一些别的包不支持拓展类型
@Directive("@extends")
@Directive('@key(fields:"id")')
export class User {
    @Field(type => Int)
    @Directive('@external') //标记在别的subgraph里存在属性
    id: number;
    // @Directive('@external')
    // @Field()
    // name: string;
    @Field()
    test: string;
    @Field(type => [Post], { nullable: true })
    posts?: Post[];
}