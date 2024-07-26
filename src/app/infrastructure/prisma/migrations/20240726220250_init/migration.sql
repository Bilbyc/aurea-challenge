-- CreateTable
CREATE TABLE "AutoInfracaoTransito" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "nomeAgente" TEXT NOT NULL,
    "nomeCondutor" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "AutoInfracaoTransito_pkey" PRIMARY KEY ("id")
);
