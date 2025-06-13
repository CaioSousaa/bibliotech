import { Module } from "@nestjs/common";
import { LibrarianModule } from "src/modules/librarian/librarian.module";

@Module({
  imports: [LibrarianModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
