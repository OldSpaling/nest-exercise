import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/permissions')
export class PermissionController {
    constructor() { }
    @Get('test')
    async test() {
        return "test";
    }
}