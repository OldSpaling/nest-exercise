import { Field, InputType, IntersectionType, ObjectType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { extend } from "@nestjs/graphql/dist/utils";

/**
 * 同样的结构，不同的场景有些需要字段全部是必须的，另外一种场景是所有字段是可选的
 */
@InputType()
export class MapTypeCreateUserInput {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
}
/**
 * @description PartialType 生成传入类型属性相同，但是都是可空的，包括@field 都是可空的
 * @description PartialType第二个参数默认是当前类声明参数，如果继承和被继承的一样 可以省略不写
 */
@InputType()
export class MapTypeUpdateUserInput extends PartialType(MapTypeCreateUserInput) {

}
/**
 * 如果继承和被继承的不一样 ObjectType和InputType，需要写上当前的
 */
@ObjectType()
export class MapTypeUpdateUserInput2 extends PartialType(MapTypeCreateUserInput, ObjectType) {

}
/**
 * PickType 继承类的部分参数，第二个参数是要继承的属性名字，第三个参数和PartialType 一样
 */
@InputType()
export class MapTypeUpdateUserInput3 extends PickType(MapTypeCreateUserInput, ["email"] as const) {

}

/**
 * OmitType 继承类的部分参数，第二个参数是不要继承的属性名字，第三个参数和PartialType 一样
 */
@InputType()
export class MapTypeUpdateUserInput4 extends OmitType(MapTypeCreateUserInput, ["email"] as const) {
}
//#region Intersection 组合多个类型为一种类型并拥有所有类全部属性
@InputType()
export class IntersectionCreateUserInput {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
}
@ObjectType()
export class IntersectionAdditionalUserInfo {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}
@InputType()
export class IntersectionUpdateUserInput extends IntersectionType(IntersectionCreateUserInput, IntersectionAdditionalUserInfo) {

}
//#endregion
//#region Composition 上面的可以组合使用
@InputType()
export class CompositionUpdateUserInput extends PartialType(OmitType(IntersectionCreateUserInput, ["email"] as const)) {

}
@ObjectType()
export class CompositionUpdateUserResult extends PartialType(IntersectionAdditionalUserInfo) {
    @Field({ nullable: true })
    test?: string;
}

//#endregion