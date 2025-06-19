import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { BookRepository } from "src/external/repositories/BookRepository";
import { IPortBookRepository } from "../port/IPortBookRepository";

export interface IParamsRequest {
  id: string;
}

@Injectable()
export class DeleteManyBooksService {
  constructor(
    @Inject(BookRepository) private bookRepository: IPortBookRepository,
  ) {}

  public async execute({ id }: IParamsRequest): Promise<void> {
    const bookExists = await this.bookRepository.getBookById(id);

    if (!bookExists) {
      throw new NotAcceptableException(
        "Impossível excluir, nenhum livro corresponde com esse id",
      );
    }

    await this.bookRepository.deleteManyBooks(id);
  }
}
