import { Response } from "express"
import { RespostaSolicitacaoCancelamentoService } from "../../../services/respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.service"
import { RespostaSolicitacaoCancelamentoController } from "./resposta-solicitacao-cancelamento.controller"
import { Test, TestingModule } from "@nestjs/testing"
import { CreateRespostaSolicitacaoDto } from "../../../domain/respostaSolicitacaoCancelamento/dtos/create-resposta-solicitacao.dto"

describe('RespostaSolicitacaoCancelamentoController', () => {
    let controller: RespostaSolicitacaoCancelamentoController
    let service: RespostaSolicitacaoCancelamentoService

    const mockService = {
        respondeSolicitacaoCancelamento: jest.fn(),
        atualizaSolicitacaoCancelamento: jest.fn(),
        atualizaAit: jest.fn()
    }

    const mockResponse = () => {
        const res: Partial<Response> = {}
        res.status = jest.fn().mockReturnThis()
        res.send = jest.fn().mockReturnThis()
        return res as Response
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RespostaSolicitacaoCancelamentoController],
            providers: [{
                provide: RespostaSolicitacaoCancelamentoService,
                useValue: mockService
            }]
        }).compile()

        controller = app.get<RespostaSolicitacaoCancelamentoController>(RespostaSolicitacaoCancelamentoController)
        service = app.get<RespostaSolicitacaoCancelamentoService>(RespostaSolicitacaoCancelamentoService)
    })

    describe('resposta solicitacao de cancelamento', () => {
        it('deve retornar uma RespostaSolicitacaoCancelamento', async () => {
            const createRespostaSolicitacaoDto: CreateRespostaSolicitacaoDto = {
                solicitacaoCancelamentoId: 1,
                aceitar: true,
                parecer: "justificativa"
            }

            const result = {
                id: 1,
                solicitacaoCancelamento: 10,
                parecer: "parecer"
            }

            mockService.respondeSolicitacaoCancelamento.mockResolvedValue(result)

            const res = mockResponse()
            await controller.respondeSolicitacao(createRespostaSolicitacaoDto, res)

            expect(service.respondeSolicitacaoCancelamento).toHaveBeenCalledWith(createRespostaSolicitacaoDto)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalledWith(result)
        })

        it('deve disparar um erro', async () => {
            const createRespostaSolicitacaoDto: CreateRespostaSolicitacaoDto = {
                solicitacaoCancelamentoId: 1,
                aceitar: true,
                parecer: "justificativa"
            }
            
            mockService.respondeSolicitacaoCancelamento.mockRejectedValue(new Error('test error'));

            const res = mockResponse();
            await controller.respondeSolicitacao(createRespostaSolicitacaoDto, res);

            expect(service.respondeSolicitacaoCancelamento).toHaveBeenCalledWith(createRespostaSolicitacaoDto);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });
    })


})