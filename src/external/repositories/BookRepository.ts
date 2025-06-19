import { Book } from "generated/prisma";
import { CreateBookDTO } from "src/modules/book/dto/CreateBookDTO";
import { IPortBookRepository } from "src/modules/book/port/IPortBookRepository";
import { prisma } from "../../external/database/prisma";
import { UpdateBookDTO } from "src/modules/book/dto/UpdateBookDTO";

export class BookRepository implements IPortBookRepository {
  public async updateBook(
    id: string,
    { author, availableQty, genre, rentedQty, title, totalQty }: UpdateBookDTO,
  ): Promise<Book | undefined> {
    const bookExists = await prisma.book.findUnique({ where: { id } });

    if (!bookExists) return undefined;

    if (totalQty != undefined) bookExists.totalQty = totalQty;
    if (author) bookExists.author = author;
    if (genre) bookExists.genre = genre;
    if (title) bookExists.title = title;
    if (availableQty != undefined) bookExists.availableQty = availableQty;
    if (rentedQty != undefined) bookExists.rentedQty = rentedQty;

    const newAvailableQty =
      Number(bookExists.totalQty) - Number(bookExists.rentedQty);
    const newRentedQty = Number(bookExists.totalQty) - newAvailableQty;

    const book = await prisma.book.update({
      where: {
        id: bookExists.id,
      },
      data: {
        author: bookExists.author,
        availableQty: newAvailableQty,
        genre: bookExists.genre,
        rentedQty: newRentedQty,
        title: bookExists.title,
        totalQty: bookExists.totalQty,
      },
    });

    return book;
  }

  public async getBookByTitle(title: string): Promise<boolean> {
    const bookAlreadyExists = await prisma.book.findFirst({ where: { title } });

    if (bookAlreadyExists) return true;

    return false;
  }

  public async deleteManyBooks(id: string): Promise<void> {
    await prisma.book.delete({
      where: { id },
    });
  }

  public async deleteBooks(quantity: number, id: string): Promise<Book> {
    const book = await prisma.book.findUnique({ where: { id } });

    const newTotalBooks = Number(book?.totalQty) - quantity;

    const newTotalBooksAvailable = newTotalBooks - Number(book?.rentedQty);

    const deleteBook = await prisma.book.update({
      where: { id },
      data: {
        totalQty: newTotalBooks,
        availableQty: newTotalBooksAvailable,
      },
    });

    return deleteBook;
  }

  public async getBookById(id: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) return null;

    return book;
  }

  public async listBook(): Promise<Book[] | null> {
    const books = await prisma.book.findMany();

    if (!books) return null;

    return books;
  }

  public async create({
    author,
    title,
    totalQty,
    genre,
  }: CreateBookDTO): Promise<Book> {
    const availableQty = totalQty;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        totalQty,
        genre,
        rentedQty: 0,
        availableQty: availableQty,
      },
    });

    return book;
  }
}
