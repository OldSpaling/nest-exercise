import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";


@Scalar('Date', type => Date)
export class DataScalar implements CustomScalar<number, Date>{
    description = 'Date custom scalar type';

    /**
     * 
     * @param value from client
     */
    parseValue(value: number): Date {
        return new Date(value);
    }
    /**
     * 
     * @param value to client
     */
    serialize(value: Date): number {
        return value.getTime();
    }
    /**
     * 
     * @param ast from client with not json
     */
    parseLiteral(ast: ValueNode): Date {
        if (ast.kind == Kind.INT) {
            return new Date(+ast.value);
        }
        return null;
    }
}