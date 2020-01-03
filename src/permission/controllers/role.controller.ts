import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/roles')
export class RoleController {
    constructor() { }
    @Get('test')
    async test() {
        return "test";
    }
}