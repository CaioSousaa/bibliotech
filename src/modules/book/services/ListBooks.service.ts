import { Inject, Injectable } from "@nestjs/common";
import { BookRepository } from "src/external/repositories/BookRepository";
import { IPortBookRepository } from "../port/IPortBookRepository";
import { Book } from "generated/prisma";

@Injectable()
export class ListBooksService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute(): Promise<Book[]> {
    const books = await this.bookRepository.listBook();

    if (books === null) {
      throw new Error("Nenhum livro cadastrado");
    }

    return books;
  }
}
