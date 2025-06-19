import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { BookRepository } from "src/external/repositories/BookRepository";
import { IPortBookRepository } from "../port/IPortBookRepository";
import { Book } from "generated/prisma";

export interface IRequest {
  quantity: number;
}

export interface IRequestParams {
  id: string;
}

@Injectable()
export class DeleteBooksService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute(
    { quantity }: IRequest,
    { id }: IRequestParams,
  ): Promise<Book> {
    const bookExists = await this.bookRepository.getBookById(id);

    if (!bookExists) {
      throw new NotAcceptableException(
        "Impossível excluir, nenhum livro corresponde com esse id",
      );
    }

    const remainingBooks = bookExists.totalQty - bookExists.rentedQty;

    if (quantity > remainingBooks) {
      throw new NotAcceptableException(
        "Impossível excluir, a quantidade desejada é maior que a quantidade emprestada",
      );
    }

    const bookUpdated = await this.bookRepository.deleteBooks(quantity, id);

    return bookUpdated;
  }
}
