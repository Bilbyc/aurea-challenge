import { Module } from "@nestjs/common";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { AitRepository } from "./ait.repository";
import { PrismaService } from "../prisma/prisma.service";

@Module({
    providers: [PrismaService, {
        provide: IAitRepository,
        useClass: AitRepository
    }],
    exports: [IAitRepository]
})

export class RepositoriesModule {}