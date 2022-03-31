import {Injectable, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule, MongooseModuleOptions, MongooseOptionsFactory} from '@nestjs/mongoose';

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('mongoUri'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };
    }
}

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        ConfigModule,
    ],
})
export class DatabaseModule {}
