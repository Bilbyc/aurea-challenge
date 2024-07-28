import { Module } from "@nestjs/common";
import { AitController } from "./ait/ait.controller";
import { ServicesModule } from "../../services/sevices.module";
import { SolicitacaoCancelamentoController } from "./solicitacaoCancelamento/solicitacao-cancelamento.controller";

@Module({
    imports:[ServicesModule],
    controllers:[AitController, SolicitacaoCancelamentoController]
})

export class ControllersModule {}