import { Field, ObjectType } from "@nestjs/graphql";
import { Character } from "./character.model";

@ObjectType()
export class Warrior extends Character{
    @Field()
    level: number;
}