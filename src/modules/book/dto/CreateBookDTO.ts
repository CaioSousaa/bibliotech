import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { Loan, User } from "generated/prisma";

export class CreateBookDTO {
  @IsString({ message: "O campo título precisa ser uma string" })
  @IsNotEmpty({ message: "O campo título precisa ser preenchido" })
  title: string;

  @IsNumber({}, { message: "O campo quantidade total precisa ser um número" })
  @IsNotEmpty({ message: "O campo quantidade total precisa ser preenchido" })
  totalQty: number;

  @IsString({ message: "O campo autor precisa ser uma string" })
  @IsNotEmpty({ message: "O campo autor precisa ser preenchido" })
  author: string;

  @IsString({ message: "O campo gênero precisa ser uma string" })
  @IsNotEmpty({ message: "O campo gênero precisa ser preenchido" })
  genre: string;

  @IsOptional()
  rentedQty?: number;

  @IsOptional()
  availableQty?: number;

  loans?: Loan;
  readers?: User;
}
