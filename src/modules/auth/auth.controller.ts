import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {IUser} from '../users/user.interface';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Register user'})
    register(@Body() registerDto: CreateUserDto): Promise<IUser> {
        return this.authService.register(registerDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'login user'})
    login(@Body() loginDto: LoginUserDto): Promise<any> {
        return this.authService.login(loginDto);
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('/me')
    // async myProfile(@Request() request, @AuthUser() authUser): Promise<any> {
    //     // const user = await this.userService.findById(authUser.sub);

    //     // return {
    //     //     authUser,
    //     // };
    //     return 'hello world!';
    // }
}
