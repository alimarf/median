import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const { httpAdapter } = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // app.enableCors({
  //   origin: 'https://median-k7k6wa7kg-alims-projects-6beec4b0.vercel.app', // Replace with your frontend domain
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  //   credentials: true,
  // });

  await app.listen(3000);
}
bootstrap();
