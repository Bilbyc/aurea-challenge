import { Prisma } from "@prisma/client";
import { AutoInfracaoTransito } from "../../domain/ait/AutoInfracaoTransito";
import { CreateAitDto } from "../../domain/ait/dtos/create-ait.dto";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { PrismaService } from "../prisma/prisma.service";
import { plainToClass } from "class-transformer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AitRepository implements IAitRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateAitDto): Promise<AutoInfracaoTransito> {
        const ait = await this.prisma.autoInfracaoTransito.create({data})

        return plainToClass(AutoInfracaoTransito, ait)
    }

}