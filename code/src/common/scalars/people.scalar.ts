import { CustomScalar, ID, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

export class People {
    id: number;
    name: string;
}
type PeopleClient = { ID: number, Name: string };

/**
 * @example 
 * #query
 * query($people: People) {
  author(id: 10, people: $people) {
    id
    lastName,
    people
  }
}
 * #variables
 {
  "people": {
    "ID":1,
    "Name":"test"
  }
}
 *#result
 * ```json
 *  {
 *   "data": {
 *     "author": {
 *       "id": 10,
 *       "lastName": "lastName10",
 *       "people": {
 *         "ID": 10,
 *         "Name": "people name 10"
 *       }
 *     }
 *   }
 *   }
 */
@Scalar(People.name, type => People)
export class PeopleScalar implements CustomScalar<PeopleClient, People>{
    description = "people scalar";
    /**
     * 
     * @param value from client with json，in fact:value from variables
     */
    parseValue(value: PeopleClient) {
        return <People>{ id: value.ID, name: value.Name };
    }
    /**
     * 
     * @param value to client
     */
    serialize(value: People): PeopleClient {
        return <PeopleClient>{ ID: value.id, Name: value.name };
    }
    /**
     * 
     * @param ast from client with not json
     */
    parseLiteral(ast: ValueNode): People {
        if (ast.kind == Kind.INT) {
            return { id: 1, name: ast.value };
        }
        [].push
        return null;
    }
}