/*
  Warnings:

  - A unique constraint covering the columns `[nombre,idUsuarioCreador]` on the table `Proyecto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_nombre_idUsuarioCreador_key" ON "Proyecto"("nombre", "idUsuarioCreador");
