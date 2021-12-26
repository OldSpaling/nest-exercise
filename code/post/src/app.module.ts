import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLPostModule } from './graphql-post/graphql-post.module';

@Module({
  imports: [GraphQLPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
