import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        server: {
          cors: true,
          playground: true,
          debug: true,
          context: () => {
            return { authToken: 'testtoken' };
          },
        },
        gateway: {
          serviceList: [
            { name: 'users', url: 'http://localhost:3001/graphql' },
            { name: 'posts', url: 'http://localhost:3002/graphql' },
          ],
        },
      }),
      imports: [AuthModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class MyGraphQLGatewayModule {}
