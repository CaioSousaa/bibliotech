import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3333, () => {
    console.log("[SERVER IS RUN IN PORT 3333]");
  });
}
bootstrap();
