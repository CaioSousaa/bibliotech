import { Module } from "@nestjs/common";
import { BookModule } from "src/modules/book/book.module";
import { LibrarianModule } from "src/modules/librarian/librarian.module";

@Module({
  imports: [LibrarianModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
