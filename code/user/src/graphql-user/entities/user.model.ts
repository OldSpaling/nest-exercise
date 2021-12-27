import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id")')
export class User {
    @Field((type) => Int)
    id: number;
    @Field()
    name: string;
}
