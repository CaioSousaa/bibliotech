import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { IPortBookRepository } from "../port/IPortBookRepository";
import { BookRepository } from "src/external/repositories/BookRepository";
import { Book } from "generated/prisma";

interface IRequest {
  title: string;
  totalQty: number;
  author: string;
  genre: string;
}

@Injectable()
export class CreateBookService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute({
    author,
    genre,
    title,
    totalQty,
  }: IRequest): Promise<Book> {
    const bookAlreadyExists = await this.bookRepository.getBookByTitle(title);

    if (bookAlreadyExists) {
      throw new NotAcceptableException("Titulo já registrado");
    }

    const bookData = {
      author,
      genre,
      title,
      totalQty,
    };

    const book = await this.bookRepository.create(bookData);

    return book;
  }
}
