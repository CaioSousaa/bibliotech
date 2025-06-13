import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { LibrarianRepository } from "src/external/repositories/LibrarianRepository";
import { IPortLibrarianRepository } from "../port/IPortLibrarianRepository";

interface IRequest {
  id: string;
}

@Injectable()
export class RemoveLibrarianService {
  constructor(
    @Inject(LibrarianRepository)
    private librarianRepository: IPortLibrarianRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const librarian = await this.librarianRepository.findLibrarianById(id);

    if (!librarian) {
      throw new NotAcceptableException(
        "Impossivel excluir, bibliotecario não existe",
      );
    }

    await this.librarianRepository.remove(id);
  }
}
