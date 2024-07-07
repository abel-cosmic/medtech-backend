/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchId` on the `Branch` table. All the data in the column will be lost.
  - The primary key for the `Broker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchBranchId` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `brokerId` on the `Broker` table. All the data in the column will be lost.
  - The primary key for the `DataEncoder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataEncoderId` on the `DataEncoder` table. All the data in the column will be lost.
  - The primary key for the `Filler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fillerId` on the `Filler` table. All the data in the column will be lost.
  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchBranchId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `Form` table. All the data in the column will be lost.
  - The primary key for the `FormAssigned` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formAssignedId` on the `FormAssigned` table. All the data in the column will be lost.
  - The primary key for the `Partner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `partnerId` on the `Partner` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentId` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `Region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `regionId` on the `Region` table. All the data in the column will be lost.
  - The primary key for the `SuperAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `superAdminId` on the `SuperAdmin` table. All the data in the column will be lost.
  - The primary key for the `SystemLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `logId` on the `SystemLog` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Broker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Broker" DROP CONSTRAINT "Broker_branchBranchId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_branchBranchId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "adminId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_pkey",
DROP COLUMN "branchId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Branch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Broker" DROP CONSTRAINT "Broker_pkey",
DROP COLUMN "branchBranchId",
DROP COLUMN "brokerId",
ADD COLUMN     "branchId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Broker_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DataEncoder" DROP CONSTRAINT "DataEncoder_pkey",
DROP COLUMN "dataEncoderId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DataEncoder_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Filler" DROP CONSTRAINT "Filler_pkey",
DROP COLUMN "fillerId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Filler_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
DROP COLUMN "branchBranchId",
DROP COLUMN "formId",
ADD COLUMN     "branchId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FormAssigned" DROP CONSTRAINT "FormAssigned_pkey",
DROP COLUMN "formAssignedId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FormAssigned_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_pkey",
DROP COLUMN "partnerId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "paymentId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Region" DROP CONSTRAINT "Region_pkey",
DROP COLUMN "regionId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SuperAdmin" DROP CONSTRAINT "SuperAdmin_pkey",
DROP COLUMN "superAdminId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SystemLog" DROP CONSTRAINT "SystemLog_pkey",
DROP COLUMN "logId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
