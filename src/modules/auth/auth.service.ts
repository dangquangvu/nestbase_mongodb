import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {UserService} from '../users/user.service';
import {LoginUserDto} from './dto/login-user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {IUser} from '../users/user.interface';
import {ErrorMessages} from 'src/shared/errors/error';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly service: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerDto: CreateUserDto): Promise<IUser> {
        return this.service.register(registerDto);
    }

    async login(input: LoginUserDto): Promise<any> {
        const {email, password} = input;
        const user: IUser = await this.service.findByEmail(email);
        if (!user) {
            throw new NotFoundException(ErrorMessages.login_fail);
        }

        await this.checkPassword(password, user.password);
        const payload = {email: user.email, id: user._id};
        const jwt = await this.generateJwtToken(payload);
        return {
            fullName: user.fullName,
            email: user.email,
            id: user._id,
            accessToken: jwt,
        };
    }

    async checkPassword(attemptPass: string, password: string) {
        const match = await bcrypt.compare(attemptPass, password);
        if (!match) {
            throw new NotFoundException(ErrorMessages.wrong_password);
        }
        return match;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.service.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Username or password is incorrect');
        }
        const compareResult = await bcrypt.compare(password, user.password);
        if (!compareResult) {
            throw new UnauthorizedException('Username or password is incorrect');
        }
        return user;
    }

    async generateJwtToken(payload: object): Promise<{accessToken: string}> {
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get<string>('jwtExpiresIn'),
            }),
        };
    }
}
