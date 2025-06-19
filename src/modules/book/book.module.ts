import { Module } from "@nestjs/common";
import { BookController } from "./infra/http/Book.controller";
import { CreateBookService } from "./services/CreateBook.service";
import { BookRepository } from "src/external/repositories/BookRepository";
import { ListBooksService } from "./services/ListBooks.service";
import { GetBookByIdService } from "./services/GetBookById.service";
import { DeleteManyBooksService } from "./services/DeleteManyBooks.service";
import { DeleteBooksService } from "./services/DeleteBooks.service";
import { UpdateBookService } from "./services/UpdateBook.service";

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    CreateBookService,
    BookRepository,
    ListBooksService,
    GetBookByIdService,
    DeleteManyBooksService,
    DeleteBooksService,
    UpdateBookService,
  ],
})
export class BookModule {}
