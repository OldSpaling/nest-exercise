import { Controller, Get } from '@nestjs/common';
import { ActionGroupService } from '../services';
import { CommonService } from '../../common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Controller('api/v1/action/groups')
export class ActionGroupController {
    constructor(private actionGroupService: ActionGroupService) { }
    @Get('test')
    async test() {
        return "test";
    }

    @Get('routes')
    public async getAllRoutes() {
        let app = CommonService.getApp();
        const options = new DocumentBuilder()
            // .setTitle('Cats example')
            // .setDescription('The cats API description')
            .setVersion('1.0')
            .addTag('permission')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        var routeTable = [];
        for (let routeItem in document.paths) {
            console.log(routeItem);
            for (let protoItem in document.paths[routeItem]) {
                //swagger get route for test/{name},convert to test/:name
                routeTable.push({ name: routeItem.replace(/\{([\s\S]+)\}/, ':$1'), protocol: protoItem });
            }
        }
        return routeTable;
    }
    @Get("testdb")
    async getrecord() {
        return await this.actionGroupService.repository.find();
    }
}