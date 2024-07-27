export class AutoInfracaoTransito {
    id: string
    nome: string
    data: Date
    nomeAgente: string
    nomeCondutor: string
    status: Status = Status.EM_ANDAMENTO
}

export enum Status {
    EM_ANDAMENTO,
    SOLICITADO_CANCELAMENTO,
    CANCELADO
}