import { Prisma } from "@prisma/client";
import { AutoInfracaoTransito, Status } from "../../domain/ait/AutoInfracaoTransito";
import { CreateAitDto } from "../../domain/ait/dtos/create-ait.dto";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { PrismaService } from "../prisma/prisma.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { UpdateStatusDto } from "../../domain/ait/dtos/update-status.dto";

@Injectable()
export class AitRepository implements IAitRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateAitDto): Promise<AutoInfracaoTransito> {
        const ait = await this.prisma.autoInfracaoTransito.create({data})

        return plainToClass(AutoInfracaoTransito, ait)
    }

    async findById(id: number): Promise<AutoInfracaoTransito> {
        const ait = await this.prisma.autoInfracaoTransito.findUnique({ where: { id: id }})

        return plainToClass(AutoInfracaoTransito, ait)
    }

    async updateStatus(data: UpdateStatusDto): Promise<void> {
        const { aitId, status } = data
        await this.prisma.autoInfracaoTransito.update({
            where: {
                id: aitId,
            },
            data: {
                status: status
            }
        })
    }

    async updateByRespostaSolicitacao(id: number, status: Status): Promise<AutoInfracaoTransito> {
        const ait = await this.prisma.autoInfracaoTransito.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
        })

        return plainToClass(AutoInfracaoTransito, ait)
    }

    async listAll(): Promise<AutoInfracaoTransito[]> {
        const aitList = await this.prisma.autoInfracaoTransito.findMany()

        return aitList.map((ait) => plainToInstance(AutoInfracaoTransito, ait))
    }

}