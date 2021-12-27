import { ArgsType, Directive, Field, ID } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { People } from "../../common/scalars/people.scalar";
import { PaginationArgs } from "./pageination.args";

@ArgsType()
export class GetAuthorArgs {
    @Field(type => ID)
    id: number;
    @Field({ nullable: true })
    firstName?: string;
    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Field({ nullable: true })
    @MinLength(3)
    lastName?: string;
    @Field({ nullable: true })
    birthTime: Date;
    @Field({ nullable: true })
    people: People
}
//继承的类里有ArgsType，继承属性才能出现在参数里
@ArgsType()
export class GetPaginatedAuthorArgs extends PaginationArgs {
    @Field(type => ID, { nullable: true })
    id: number;
    @Field({ nullable: true })
    firstName?: string;
    @Field({ nullable: true })

    @MinLength(3)
    lastName?: string;
}