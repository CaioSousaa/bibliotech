import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateLibrarianService } from "../../services/CreateLibrarian.service";
import { RemoveLibrarianService } from "../../services/RemoveLibrarian.service";
import { LibrarianDTO } from "../../dto/LibrarianDTO";
import { Librarian } from "generated/prisma";

@Controller("librarian")
export class LibrarianController {
  constructor(
    private createLibrarianService: CreateLibrarianService,
    private removeLibrarianService: RemoveLibrarianService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: LibrarianDTO): Promise<Librarian> {
    return await this.createLibrarianService.execute(data);
  }

  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<void> {
    return await this.removeLibrarianService.execute({ id: String(id) });
  }
}
