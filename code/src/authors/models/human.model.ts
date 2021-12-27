import { ObjectType } from "@nestjs/graphql";
import { ICharacter } from "../interfaces/character.interface";

/**
 * implement the Character interface, use the 'implements' key:
 */
@ObjectType({
    implements:()=>[ICharacter]
})
export class Human implements ICharacter {
    id:string;
    name:string;
}