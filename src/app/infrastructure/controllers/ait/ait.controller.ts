import { Body, Controller, HttpStatus, Post, Req, Res, Get, UseFilters, HttpException } from "@nestjs/common";
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
            res.status(HttpStatus.CREATED).send(ait)
        } catch (error) {
            console.error('Erro durante criacao de AIT:', error.message)
            throw new HttpException(error.message, error.status)
        }
    }

    @Get()
    async listAll(
        @Res() res: Response): Promise<void> {

        const listaAit = await this.createAitService.listAll()

        res.status(HttpStatus.OK).send(listaAit)
    }
}