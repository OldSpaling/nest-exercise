import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './authors/author.module';
import { CommonModule } from './common/common.module';
import { UpperCaseDirective } from './common/directives/upper-case.directive';
import { globalLoggerFieldMiddleware } from './common/field-middleware/global-field-middleware';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: { settings: { "request.credentials": "include" } },
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        fieldMiddleware: [globalLoggerFieldMiddleware]
      },
      schemaDirectives: {
        upper: UpperCaseDirective
      },
      // installSubscriptionHandlers: true,//开启subscriptions模式,将被废弃
      subscriptions: {
        // "graphql-ws": true,
        //将不再维护 官方建议用前者
        // "subscriptions-transport-ws":true 
        "subscriptions-transport-ws": {
          onConnect: (connectionParams) => {
            const authToken = connectionParams.authToken;
            if (!authToken) {
              throw new Error("token is not valid");
            }
            const user = authToken;
            return { user };
          },
        },

      },
      context: (connection: { req: IncomingMessage, res: ServerResponse }) => {
        // const t=arguments;
        // connection.context will be equal to what was returned by the "onConnect" callback
        //和subscriptions-transport-ws onConnect一样 返回值会merge到context对象里，不过一个是socket的 一个是http的
        if (connection) {
          const t = connection;
        }
        return { testForContext: "@Context will have testForContext and value is return" };
      }
    }),
    CommonModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


