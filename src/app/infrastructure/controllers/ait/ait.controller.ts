import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreateAitDto } from "../../../domain/ait/dtos/create-ait.dto";
import { CreateAitService } from "../../../services/ait/create-ait.service";
import { AutoInfracaoTransito } from "../../../domain/ait/AutoInfracaoTransito";
import { Response } from "express";

@Controller('ait')
export class AitController {
    constructor(private createAitService: CreateAitService){}

        @Post()
        async createAit(
            @Body() createAitDto: CreateAitDto, 
            @Res() res: Response): Promise<void> {
                
            const ait = await this.createAitService.createAit(createAitDto)

            res.status(HttpStatus.OK).send(ait)
        }
    }