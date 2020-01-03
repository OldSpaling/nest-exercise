import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule, entities } from './permission/permission.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.100.14',
      port: 1433,
      username: 'cp',
      password: 'Win2008',
      database: 'xnguo_permission_test',
      entities: [...entities],
      synchronize: true,
    }),
    PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
