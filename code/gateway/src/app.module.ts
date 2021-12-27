import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyGraphQLGatewayModule } from './graphql-gateway/graphql-gateway';

@Module({
  imports: [MyGraphQLGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
