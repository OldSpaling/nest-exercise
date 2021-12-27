import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UnionBook {
    @Field({ nullable: true })
    title: string;
}
@ObjectType()
export class UnionAuthor {
    @Field({nullable:true})
    name: string;
}
export const ResultUnion = createUnionType({
    name: "ResultUnion",
    types: () => [UnionAuthor, UnionBook],
    resolveType(value: UnionAuthor | UnionBook) {
        if (value instanceof UnionAuthor) {
            return UnionAuthor;
        }
        if (value instanceof UnionBook) {
            return UnionBook;
        }
        return null;
    }
})