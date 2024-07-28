export class AutoInfracaoTransito {
    id: number
    nome: string
    data: Date
    nomeAgente: string
    nomeCondutor: string
    status: Status = Status.EM_ANDAMENTO
}

export enum Status {
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    SOLICITADO_CANCELAMENTO = 'SOLICITADO_CANCELAMENTO',
    CANCELADO = 'CANCELADO'
}