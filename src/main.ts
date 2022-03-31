import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {warn} from 'console';
import morgan from 'morgan';
import chalk from 'chalk';
import {CORS_EXPOSED_HEADERS} from './shared/constants';
import {ValidationConfig} from './config/validation.config';
import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ResponseTransformInterceptor} from './interceptors/response.transform.interceptor';
import {ValidatorModule} from './validators/validator.module';
import {useContainer} from 'class-validator';

async function bootstrap() {
    const morganMiddleware = morgan((tokens, req, res) => {
        return [
            chalk.hex('#ff4757').bold('🍄  Morgan --> '),
            chalk.hex('#34ace0').bold(tokens.method(req, res)),
            chalk.hex('#ffb142').bold(tokens.status(req, res)),
            chalk.hex('#ff5252').bold(tokens.url(req, res)),
            chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
            chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
        ].join(' ');
    });

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new ValidationPipe(ValidationConfig));
    app.setGlobalPrefix(configService.get<string>('apiPrefix'));

    useContainer(app.select(ValidatorModule), {fallbackOnErrors: true});

    app.use(morganMiddleware);
    const options = new DocumentBuilder()
        .setTitle('NEST BASE SERVER API')
        .setDescription('Swagger docs for nest base project')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        include: [],
    });
    SwaggerModule.setup('docs', app, document);
    // const PORT = process.env.PORT || 3001;
    app.enableCors({
        exposedHeaders: CORS_EXPOSED_HEADERS,
    });

    const port = configService.get<number>('port');
    await app.listen(port);
    warn('Swagger run on', `http://127.0.0.1:${port}/docs`);
    warn('Server run on', `http://127.0.0.1:${port}/`);
}

void bootstrap();
