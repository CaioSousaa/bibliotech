import { Librarian } from "generated/prisma";
import { LibrarianDTO } from "../dto/LibrarianDTO";

export interface IPortLibrarianRepository {
  create(data: LibrarianDTO): Promise<Librarian>;
  findLibrarianByAccessKey(accessKey: string): Promise<Librarian | null>;
  findLibrarianById(id: string): Promise<Librarian | null>;
  remove(id: string): Promise<void>;
}
