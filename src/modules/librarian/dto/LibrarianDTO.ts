import { IsNotEmpty, IsString } from "class-validator";

export class LibrarianDTO {
  @IsString({ message: "O campo nome precisa ser uma string" })
  @IsNotEmpty({ message: "O campo nome precisa ser preenchido" })
  name: string;

  @IsString({ message: "O campo chave de acesso precisa ser uma string" })
  @IsNotEmpty({ message: "O campo chave de acesso precisa ser preenchido" })
  accessKey: string;

  @IsString({ message: "O campo senha precisa ser uma string" })
  @IsNotEmpty({ message: "O campo senha precisa ser preenchido" })
  password: string;

  createdAt?: Date;
}
