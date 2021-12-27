import { ArgsType, Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum EnumAllowColor {
    RED,
    GREEN,
    BLUE
}
registerEnumType(EnumAllowColor, {
    name: 'EnumAllowColor'
})

@ObjectType()
@ArgsType()
export class EnumModelTest {
    @Field({ nullable: true })
    name?: string;
    @Field(type => EnumAllowColor, { name: "color1", description: "color des", nullable: true })
    color?: EnumAllowColor;
}