export type AutoInfracaoTransito = {
    _id: string,
    nome: string,
    data: Date,
    nomeAgente: string,
    nomeCondutor: string,
    status: boolean //TODO: implementar enum
}

export enum Status {
    EM_ANDAMENTO,
    SOLICITADO_CANCELAMENTO,
    CANCELADO
}