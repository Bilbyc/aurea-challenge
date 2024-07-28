-- CreateTable
CREATE TABLE "RespostaSolicitacaoCancelamento" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "solicitacaoCancelamentoId" INTEGER NOT NULL,
    "parecer" TEXT NOT NULL,

    CONSTRAINT "RespostaSolicitacaoCancelamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RespostaSolicitacaoCancelamento_solicitacaoCancelamentoId_key" ON "RespostaSolicitacaoCancelamento"("solicitacaoCancelamentoId");

-- AddForeignKey
ALTER TABLE "RespostaSolicitacaoCancelamento" ADD CONSTRAINT "RespostaSolicitacaoCancelamento_solicitacaoCancelamentoId_fkey" FOREIGN KEY ("solicitacaoCancelamentoId") REFERENCES "SolicitacaoCancelamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
