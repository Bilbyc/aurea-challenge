import { Test, TestingModule } from '@nestjs/testing'
import { AitController } from './ait.controller'
import { CreateAitService } from '../../../services/ait/ait.service'
import { Response } from 'express'
import { CreateAitDto } from '../../../domain/ait/dtos/create-ait.dto'
import { AutoInfracaoTransito, Status } from '../../../domain/ait/AutoInfracaoTransito'
import { BadRequestException } from '@nestjs/common'

describe('AitController', () => {
    let aitController: AitController
    let createAitService: CreateAitService

    const mockService = {
        createAit: jest.fn(),
        listAll: jest.fn()
    }

    const mockResponse = () => {
        const res: Partial<Response> = {}
        res.status = jest.fn().mockReturnThis()
        res.send = jest.fn().mockReturnThis()
        return res as Response
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AitController],
            providers: [{
                provide: CreateAitService,
                useValue: mockService
            }]
        }).compile()

        aitController = app.get<AitController>(AitController)
        createAitService = app.get<CreateAitService>(CreateAitService)
    })

    describe('findAll', () => {
        it('deve retornar uma lista de Aits', async () => {
            const result: AutoInfracaoTransito[] = [{
                id: 1,
                nome: "TesteNome",
                data: new Date("28/07/2024"),
                nomeAgente: "TesteAgente",
                nomeCondutor: "TesteCondutor",
                status: Status.EM_ANDAMENTO
            }, {
                id: 2,
                nome: "TesteNome",
                data: new Date("28/07/2024"),
                nomeAgente: "TesteAgente",
                nomeCondutor: "TesteCondutor",
                status: Status.CANCELADO
            }];

            mockService.listAll.mockResolvedValue(result)

            const res = mockResponse();
            await aitController.listAll(res)


            expect(createAitService.listAll).toHaveBeenCalled
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(result)
        })
    })

    describe('createAit', () => {
        it('deve criar um Ait e retorna-lo', async () => {
            const createAitDto: CreateAitDto = {
                nome: "TesteNome",
                data: new Date("28/07/2024"),
                nomeAgente: "TesteAgente",
                nomeCondutor: "TesteCondutor"
            }

            mockService.createAit.mockResolvedValue(createAitDto)
            const res = mockResponse();
            await aitController.createAit(createAitDto, res)

            expect(createAitService.createAit).toHaveBeenCalledWith(createAitDto)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalledWith(createAitDto)
        })
    })

    describe('createAit - error durante requisicao', () => {
        it('deve cair no try catch e retornar erro', async () => {
            const createAitDtoIncorreto: any = {
                nome: 10,
                data: new Date("28/07/2024"),
                nomeAgente: 14,
                nomeCondutor: "TesteCondutor"
            }
            mockService.createAit.mockRejectedValue(new Error('test error'))

            const res = mockResponse();
            await aitController.createAit(createAitDtoIncorreto, res)

            expect(res.status).not.toHaveBeenCalled()
            expect(res.send).not.toHaveBeenCalled()
        })
    })

})