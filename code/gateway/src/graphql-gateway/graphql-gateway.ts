import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { AuthenticatedDataSource } from './auth/authenticated-data-source';
@Module({
    imports: [
        GraphQLGatewayModule.forRoot({
            server: {
                cors: true,
                playground: true,
                debug: true,
                context: () => {
                    return { "authToken": "testtoken" };
                }
            },
            gateway: {
                serviceList: [
                    { name: 'users', url: 'http://localhost:3001/graphql' },
                    { name: 'posts', url: 'http://localhost:3002/graphql' },
                ],
            },
        }),
    ],
    providers: [
        {
            provide: AuthenticatedDataSource,
            useValue: AuthenticatedDataSource
        },
        {
            provide: GATEWAY_BUILD_SERVICE,
            useFactory: (AuthenticatedDataSource)=>{
                return ({name,url})=>new AuthenticatedDataSource({url});
            },
            inject: [AuthenticatedDataSource]
        },
    ],
})
export class MyGraphQLGatewayModule { }
