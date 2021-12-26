import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLUserModule } from './graphql-user/graphql-user.module';

@Module({
  imports: [GraphQLUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
