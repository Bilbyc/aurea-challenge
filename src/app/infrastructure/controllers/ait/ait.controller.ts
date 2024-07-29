import { Body, Controller, HttpStatus, Post, Req, Res, Get } from "@nestjs/common";
import { CreateAitDto } from "../../../domain/ait/dtos/create-ait.dto";
import { CreateAitService } from "../../../services/ait/ait.service";
import { AutoInfracaoTransito } from "../../../domain/ait/AutoInfracaoTransito";
import { Response } from "express";

@Controller('ait')
export class AitController {
    constructor(private createAitService: CreateAitService) { }

    @Post()
    async createAit(
        @Body() createAitDto: CreateAitDto,
        @Res() res: Response): Promise<void> {
        try {
            const ait = await this.createAitService.createAit(createAitDto)
            res.status(HttpStatus.OK).send(ait)
        } catch (error) {
            console.error('Erro ao enviar solicitacao de criacao de AIT:', error.message)
        }
    }

    @Get()
    async listAll(
        @Res() res: Response): Promise<void> {

        const listaAit = await this.createAitService.listAll()

        res.status(HttpStatus.OK).send(listaAit)
    }
}