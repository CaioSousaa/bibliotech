import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { BookRepository } from "src/external/repositories/BookRepository";
import { IPortBookRepository } from "../port/IPortBookRepository";
import { Book } from "generated/prisma";

export interface IRequest {
  title?: string;
  totalQty?: number;
  availableQty?: number;
  author?: string;
  genre?: string;
  rentedQty?: number;
}

export interface IRequestParams {
  id: string;
}

@Injectable()
export class UpdateBookService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute(
    { author, availableQty, genre, rentedQty, title, totalQty }: IRequest,
    { id }: IRequestParams,
  ): Promise<Book | undefined> {
    const bookExists = await this.bookRepository.getBookById(id);

    if (title) {
      const titleExists = await this.bookRepository.getBookByTitle(title);

      if (titleExists) {
        throw new NotAcceptableException("Titulo já registrado");
      }
    }

    if (!bookExists) {
      throw new NotAcceptableException(
        "Impossível excluir, nenhum livro corresponde com esse id",
      );
    }

    if (rentedQty && rentedQty > bookExists.totalQty) {
      throw new NotAcceptableException(
        "Impossível realizar esta operação, quantidade alugada não pode ser maior que a quantidade total de livros",
      );
    }

    if (availableQty && availableQty > bookExists.totalQty) {
      throw new NotAcceptableException(
        "Impossível realizar esta operação, quantidade disponivel não pode ser maior que a quantidade total de livros",
      );
    }

    const bookData = {
      author,
      availableQty,
      genre,
      rentedQty,
      title,
      totalQty,
    };

    const book = await this.bookRepository.updateBook(id, bookData);

    return book;
  }
}
