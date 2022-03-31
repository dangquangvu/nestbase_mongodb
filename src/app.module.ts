import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_FILTER} from '@nestjs/core';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import {DatabaseModule} from './database/database.module';
import {AllExceptionFilter} from './filters/exception.filter';
import {LoggerService} from './logger/custom.logger';
import {LoggerModule} from './logger/logger.module';
import {AuthModule} from './modules/auth/auth.module';
import {HealthModule} from './modules/health/health.module';
import {UserModule} from './modules/users/user.module';
import {ValidatorModule} from './validators/validator.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, authConfig],
        }),
        AuthModule,
        LoggerModule,
        HealthModule,
        DatabaseModule,
        ValidatorModule,
        UserModule,
    ],
    providers: [
        LoggerService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
    ],
})
export class AppModule {}
