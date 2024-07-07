/*
  Warnings:

  - You are about to drop the column `branchId` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Form` table. All the data in the column will be lost.
  - Added the required column `branchBranchId` to the `Broker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchBranchId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Broker" DROP COLUMN "branchId",
ADD COLUMN     "branchBranchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "branchId",
ADD COLUMN     "branchBranchId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_branchBranchId_fkey" FOREIGN KEY ("branchBranchId") REFERENCES "Branch"("branchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_branchBranchId_fkey" FOREIGN KEY ("branchBranchId") REFERENCES "Branch"("branchId") ON DELETE RESTRICT ON UPDATE CASCADE;
