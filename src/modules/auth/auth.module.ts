import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './strategies/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './strategies/jwt.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserModule} from '../users/user.module';
import {AuthController} from './auth.controller';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecretKey'),
                signOptions: {
                    expiresIn: configService.get<string>('jwtExpiresIn'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
