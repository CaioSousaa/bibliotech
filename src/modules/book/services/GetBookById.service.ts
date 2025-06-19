import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { BookRepository } from "src/external/repositories/BookRepository";
import { IPortBookRepository } from "../port/IPortBookRepository";
import { Book } from "generated/prisma";

export interface IParamsRequest {
  id: string;
}

@Injectable()
export class GetBookByIdService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute({ id }: IParamsRequest): Promise<Book> {
    const bookExists = await this.bookRepository.getBookById(id);

    if (!bookExists) {
      throw new NotAcceptableException("Nenhum livro corresponde com esse id");
    }

    return bookExists;
  }
}
