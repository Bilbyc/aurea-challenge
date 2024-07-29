import { Test, TestingModule } from '@nestjs/testing';
import { SolicitacaoCancelamentoController } from './solicitacao-cancelamento.controller';
import { CreateSolicitacaoCancelamentoService } from '../../../services/solicitacaoCancelamento/solicitacao-cancelamento.service';
import { CreateSolicitacaoDto } from '../../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto';
import { Response } from 'express';
import { CancelamentoStatus, SolicitacaoCancelamento } from '../../../domain/solicitacaoCancelamento/SolicitacaoCancelamento';
import { AutoInfracaoTransito, Status } from '../../../domain/ait/AutoInfracaoTransito';

describe('SolicitacaoCancelamentoController', () => {
    let controller: SolicitacaoCancelamentoController;
    let service: CreateSolicitacaoCancelamentoService;

    const mockService = {
        createSolicitacao: jest.fn(),
        listaSolicitacoesPendentes: jest.fn(),
    };

    const mockResponse = () => {
        const res: Partial<Response> = {};
        res.status = jest.fn().mockReturnThis();
        res.send = jest.fn().mockReturnThis();
        return res as Response;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SolicitacaoCancelamentoController],
            providers: [
                {
                    provide: CreateSolicitacaoCancelamentoService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<SolicitacaoCancelamentoController>(SolicitacaoCancelamentoController);
        service = module.get<CreateSolicitacaoCancelamentoService>(CreateSolicitacaoCancelamentoService);
    });

    describe('createSolicitacao', () => {
        it('should create a solicitacao and return it', async () => {
            const createSolicitacaoDto: CreateSolicitacaoDto = { aitId: 1, justificativa: "lorem ipsum" };

            const ait: AutoInfracaoTransito = {
                id: 1,
                nome: "TesteNome",
                data: new Date("28/07/2024"),
                nomeAgente: "TesteAgente",
                nomeCondutor: "TesteCondutor",
                status: Status.EM_ANDAMENTO
            }
            const result: SolicitacaoCancelamento = {
                id: 1,
                dataFechamento: new Date("22/06/2024"),
                status: CancelamentoStatus.PENDENTE,
                aitId: ait,
                justificativa: "justificativa"
            }

            mockService.createSolicitacao.mockResolvedValue(result);

            const res = mockResponse();
            await controller.createSolicitacao(createSolicitacaoDto, res);

            expect(service.createSolicitacao).toHaveBeenCalledWith(createSolicitacaoDto);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(result);
        });

        it('deve disparar um erro', async () => {
            const createSolicitacaoDto: CreateSolicitacaoDto = { aitId: 1, justificativa: "lorem ipsum" };
            mockService.createSolicitacao.mockRejectedValue(new Error('test error'));

            const res = mockResponse();
            await controller.createSolicitacao(createSolicitacaoDto, res);

            expect(service.createSolicitacao).toHaveBeenCalledWith(createSolicitacaoDto);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });
    });

    describe('listaSolicitacoesPendentes', () => {
        it('deve retornar uma lista de Solicitacoes Cancelamento pendentes', async () => {
            const ait: AutoInfracaoTransito = {
                id: 1,
                nome: "TesteNome",
                data: new Date("28/07/2024"),
                nomeAgente: "TesteAgente",
                nomeCondutor: "TesteCondutor",
                status: Status.EM_ANDAMENTO
            }
            
            const result: SolicitacaoCancelamento[] = [{
                id: 1,
                dataFechamento: new Date("22/06/2024"),
                status: CancelamentoStatus.PENDENTE,
                aitId: ait,
                justificativa: "justificativa1"
            }, {
                id: 2,
                dataFechamento: new Date("22/06/2024"),
                status: CancelamentoStatus.PENDENTE,
                aitId: ait,
                justificativa: "justificativa2"
            }]

            mockService.listaSolicitacoesPendentes.mockResolvedValue(result);

            const res = mockResponse();
            await controller.listaSolicitacoesPendentes(res);

            expect(service.listaSolicitacoesPendentes).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(result);
        });
    });
});
