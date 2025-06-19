import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateBookDTO {
  @IsOptional()
  @IsString({ message: "O campo título precisa ser uma string." })
  title?: string;

  @IsOptional()
  @IsNumber({}, { message: "O campo quantidade total precisa ser um número." })
  totalQty?: number;

  @IsOptional()
  @IsNumber(
    {},
    { message: "O campo quantidade disponível precisa ser um número." },
  )
  availableQty?: number;

  @IsOptional()
  @IsString({ message: "O campo autor precisa ser uma string." })
  author?: string;

  @IsOptional()
  @IsString({ message: "O campo gênero precisa ser uma string." })
  genre?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: "O campo quantidade alugada precisa ser um número." },
  )
  rentedQty?: number;
}
