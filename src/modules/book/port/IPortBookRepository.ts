import { Book } from "generated/prisma";
import { CreateBookDTO } from "../dto/CreateBookDTO";
import { UpdateBookDTO } from "../dto/UpdateBookDTO";

export interface IPortBookRepository {
  create(book: CreateBookDTO): Promise<Book>;
  updateBook(id: string, data: UpdateBookDTO): Promise<Book | undefined>;

  listBook(): Promise<Book[] | null>;
  getBookByTitle(title: string): Promise<boolean>;
  getBookById(id: string): Promise<Book | null>;

  deleteBooks(quantity: number, id: string): Promise<Book>;
  deleteManyBooks(id: string): Promise<void>;
}
