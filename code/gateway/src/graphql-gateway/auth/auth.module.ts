import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { AuthenticatedDataSource } from './authenticated-data-source';
@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
export class AuthModule {}
