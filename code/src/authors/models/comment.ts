import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment{
    @Field({nullable:true})
    id?:string;
    @Field({nullable:true})
    content?:string;
}