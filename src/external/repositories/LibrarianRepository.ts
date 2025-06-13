import { Librarian } from "generated/prisma";
import { LibrarianDTO } from "src/modules/librarian/dto/LibrarianDTO";
import { IPortLibrarianRepository } from "src/modules/librarian/port/IPortLibrarianRepository";
import { prisma } from "../database/prisma";
import { NotAcceptableException } from "@nestjs/common";

export class LibrarianRepository implements IPortLibrarianRepository {
  public async findLibrarianByAccessKey(
    accessKey: string,
  ): Promise<Librarian | null> {
    const librarian = prisma.librarian.findFirst({ where: { accessKey } });

    return librarian || null;
  }
  public async findLibrarianById(id: string): Promise<Librarian | null> {
    const librarian = prisma.librarian.findUnique({ where: { id } });

    return librarian || null;
  }
  public async create({
    accessKey,
    name,
    password,
  }: LibrarianDTO): Promise<Librarian> {
    const librarian = await prisma.librarian.create({
      data: {
        accessKey,
        name,
        password,
        createdAt: new Date(),
      },
    });

    return librarian;
  }

  public async remove(id: string): Promise<void> {
    const librarian = await prisma.librarian.findUnique({ where: { id } });

    if (!librarian) {
      throw new NotAcceptableException(
        "Impossivel excluir, bibliotecario não existe!",
      );
    }

    await prisma.librarian.delete({ where: { id: librarian.id } });
  }
}
