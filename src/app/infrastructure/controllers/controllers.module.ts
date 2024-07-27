import { Module } from "@nestjs/common";
import { AitController } from "./ait/ait.controller";
import { ServicesModule } from "../../services/sevices.module";

@Module({
    imports:[ServicesModule],
    controllers:[AitController]
})

export class ControllersModule {}