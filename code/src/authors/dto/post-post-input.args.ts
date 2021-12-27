import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpvotePostInput {
    @Field(type=>Int)
    postId: number;
    @Field({nullable:true})
    title?: string;
    @Field(type=>Int,{nullable:true})
    votes?:number;
}