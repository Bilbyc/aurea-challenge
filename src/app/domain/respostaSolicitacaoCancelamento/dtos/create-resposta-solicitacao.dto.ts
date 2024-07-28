import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRespostaSolicitacaoDto {
    @IsNumber()
    @IsNotEmpty()
    solicitacaoCancelamentoId: number

    @IsBoolean()
    @IsNotEmpty()
    readonly aceitar: boolean

    @IsString()
    @IsNotEmpty()
    readonly parecer: string
}