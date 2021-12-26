import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { User } from "./entities/user.model";
import { PostResolver } from "./resolvers/post.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { PostService } from "./services/post.service";
import { UserService } from "./services/user.service";

@Module({
    imports: [GraphQLFederationModule.forRoot({
        autoSchemaFile: true,
        buildSchemaOptions: {
            orphanedTypes:[User]
        }
    })],
    providers:[UserService,PostService,PostResolver,UserResolver]
})
export class GraphQLPostModule{

}