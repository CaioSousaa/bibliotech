import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { LibrarianRepository } from "src/external/repositories/LibrarianRepository";
import { IPortLibrarianRepository } from "../port/IPortLibrarianRepository";
import { hashPasswordFunction } from "../../../shared/utils/functions/hashPasswordFunction";
import { Librarian } from "generated/prisma";

interface IRequest {
  name: string;
  accessKey: string;
  password: string;
}

@Injectable()
export class CreateLibrarianService {
  constructor(
    @Inject(LibrarianRepository)
    private librarianRepository: IPortLibrarianRepository,
  ) {}

  public async execute({
    accessKey,
    name,
    password,
  }: IRequest): Promise<Librarian> {
    const hashPassword = await hashPasswordFunction(password);

    const librarianAlreadyExists =
      await this.librarianRepository.findLibrarianByAccessKey(accessKey);

    if (librarianAlreadyExists) {
      throw new NotAcceptableException("Chave de acesso ja cadastrada");
    }

    const librarian = await this.librarianRepository.create({
      accessKey,
      name,
      password: hashPassword,
    });

    return librarian;
  }
}
