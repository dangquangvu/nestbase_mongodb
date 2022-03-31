import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

@Controller('health')
export class HealthController {
    @Get('me')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'test me'})
    getMe() {
        return 'hello world!';
    }
}
