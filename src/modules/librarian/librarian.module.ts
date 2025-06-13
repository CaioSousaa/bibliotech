import { Module } from "@nestjs/common";
import { CreateLibrarianService } from "./services/CreateLibrarian.service";
import { LibrarianRepository } from "src/external/repositories/LibrarianRepository";
import { LibrarianController } from "./infra/http/Librarian.controller";
import { RemoveLibrarianService } from "./services/RemoveLibrarian.service";

@Module({
  imports: [],
  controllers: [LibrarianController],
  providers: [
    CreateLibrarianService,
    LibrarianRepository,
    RemoveLibrarianService,
  ],
})
export class LibrarianModule {}
