import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersResolvers } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
    imports: [
        GraphQLFederationModule.forRoot({
            autoSchemaFile: true,
            context: (ctx) => {
                console.log(ctx.req.headers.auth);
                return { auth: ctx.req.headers.auth };
            }
        })
    ],
    providers: [UserService, UsersResolvers]
})
export class GraphQLUserModule {}
