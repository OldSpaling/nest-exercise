import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Post {
    @Field(type => Int)
    id: number;
    //string 和bool 不需要指定类型
    @Field()
    title: string;
    @Field(type => Int, { nullable: true })
    votes?: number;
}