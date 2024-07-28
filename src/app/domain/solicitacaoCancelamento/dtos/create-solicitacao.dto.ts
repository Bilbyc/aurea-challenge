import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateSolicitacaoDto {
    @IsNumber()
    @IsNotEmpty()
    readonly aitId: number

    @IsString()
    @IsNotEmpty()
    readonly justificativa: string
}