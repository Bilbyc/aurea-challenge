-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EM_ANDAMENTO', 'SOLICITADO_CANCELAMENTO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "CancelamentoStatus" AS ENUM ('PENDENTE', 'RECUSADO', 'ACEITO');

-- CreateTable
CREATE TABLE "AutoInfracaoTransito" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "nomeAgente" TEXT NOT NULL,
    "nomeCondutor" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'EM_ANDAMENTO',

    CONSTRAINT "AutoInfracaoTransito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitacaoCancelamento" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data_fechamento" TIMESTAMP(3),
    "aitId" INTEGER NOT NULL,
    "status" "CancelamentoStatus" NOT NULL DEFAULT 'PENDENTE',
    "justificativa" TEXT,

    CONSTRAINT "SolicitacaoCancelamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitacaoCancelamento" ADD CONSTRAINT "SolicitacaoCancelamento_aitId_fkey" FOREIGN KEY ("aitId") REFERENCES "AutoInfracaoTransito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
