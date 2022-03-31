import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {IPagination} from 'src/adapter/pagination/pagination.interface';
import {Pagination} from 'src/shared/decorators/pagination.decorator';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {FilterUserDto} from './dto/filter-user.dto';
import {IUser} from './user.interface';
import {UserService} from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get('indexs')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'index users'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    // @Roles(...[UserRoles.ADMIN, UserRoles.USER])
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number',
        type: Number,
    })
    @ApiQuery({
        name: 'perPage',
        required: false,
        description: 'Items per page',
        type: Number,
    })
    async index(@Query() filters: FilterUserDto, @Pagination() pagination: IPagination) {
        return this.service.indexs(filters, pagination);
    }

    @Get('detail/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'get detail user'})
    detail(@Param('id') id: string): Promise<IUser> {
        return this.service.detail(id);
    }
}
