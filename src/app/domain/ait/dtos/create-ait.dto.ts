import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAitDto {
    @IsNotEmpty()
    @IsString()
    readonly nome: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly data: Date

    @IsNotEmpty()
    @IsString()
    readonly nomeAgente: string

    @IsNotEmpty()
    @IsString()
    readonly nomeCondutor: string
}