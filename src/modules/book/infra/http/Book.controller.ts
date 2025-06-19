import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateBookService } from "../../services/CreateBook.service";
import { CreateBookDTO } from "../../dto/CreateBookDTO";
import { Book } from "generated/prisma";
import { ListBooksService } from "../../services/ListBooks.service";
import {
  GetBookByIdService,
  IParamsRequest,
} from "../../services/GetBookById.service";
import { DeleteManyBooksService } from "../../services/DeleteManyBooks.service";
import {
  DeleteBooksService,
  IRequest,
  IRequestParams,
} from "../../services/DeleteBooks.service";
import { UpdateBookService } from "../../services/UpdateBook.service";
import { UpdateBookDTO } from "../../dto/UpdateBookDTO";

@Controller("book")
export class BookController {
  constructor(
    private createBookService: CreateBookService,
    private listBooksService: ListBooksService,
    private getBookByIdService: GetBookByIdService,
    private deleteManyBooksService: DeleteManyBooksService,
    private deleteBookService: DeleteBooksService,
    private updateBookService: UpdateBookService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: CreateBookDTO): Promise<Book> {
    return this.createBookService.execute(data);
  }

  @Get()
  public async list(): Promise<Book[]> {
    return this.listBooksService.execute();
  }

  @Get(":id")
  public async getById(@Param("id") id: IParamsRequest): Promise<Book> {
    return this.getBookByIdService.execute({ id: String(id) });
  }

  @Delete(":id")
  public async deleteManyBooks(@Param("id") id: IParamsRequest): Promise<void> {
    return this.deleteManyBooksService.execute({ id: String(id) });
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async deleteBook(
    @Param("id") id: IRequestParams,
    @Body() quantity: IRequest,
  ): Promise<Book> {
    return this.deleteBookService.execute(quantity, { id: String(id) });
  }

  @Put("update/:id")
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateBook(
    @Param("id") id: IRequestParams,
    @Body() data: UpdateBookDTO,
  ): Promise<Book | undefined> {
    return this.updateBookService.execute(data, { id: String(id) });
  }
}
