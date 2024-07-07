/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('NOTFILLED', 'ASSIGNED', 'FILLED', 'PAID');

-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('INCREASE', 'DECREASE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANKING');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'SUPERADMIN', 'DATAENCODER');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('NOTFILLED', 'FILLED', 'PAYMENTPENDING', 'PAID');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD COLUMN     "userType" "UserType" NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "SystemLog" (
    "logId" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("logId")
);

-- CreateTable
CREATE TABLE "Broker" (
    "brokerId" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("brokerId")
);

-- CreateTable
CREATE TABLE "Filler" (
    "fillerId" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "fillerCode" TEXT NOT NULL,
    "pricePerForm" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Filler_pkey" PRIMARY KEY ("fillerId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "superAdminId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("superAdminId")
);

-- CreateTable
CREATE TABLE "DataEncoder" (
    "dataEncoderId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataEncoder_pkey" PRIMARY KEY ("dataEncoderId")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branchId" SERIAL NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branchId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "fillerId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "brokerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "madeBy" TEXT NOT NULL,
    "madeTo" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "ValueType" NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Partner" (
    "partnerId" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "partnerName" TEXT NOT NULL,
    "pricePerForm" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("partnerId")
);

-- CreateTable
CREATE TABLE "FormAssigned" (
    "formAssignedId" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "fillerId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "status" "StatusType" NOT NULL,
    "applicationNumber" TEXT NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormAssigned_pkey" PRIMARY KEY ("formAssignedId")
);

-- CreateTable
CREATE TABLE "Form" (
    "formId" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "dataEncoderId" INTEGER NOT NULL,
    "brokerId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstNameAm" TEXT NOT NULL,
    "middleNameAm" TEXT NOT NULL,
    "lastNameAm" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "birthCertificate" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "status" "FormStatus" NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "brokerCost" INTEGER NOT NULL,
    "remainingPrice" INTEGER NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("formId")
);

-- CreateTable
CREATE TABLE "Region" (
    "regionId" SERIAL NOT NULL,
    "regionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("regionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemLog_action_key" ON "SystemLog"("action");

-- CreateIndex
CREATE UNIQUE INDEX "Broker_phoneNumber_key" ON "Broker"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Filler_fillerCode_key" ON "Filler"("fillerCode");

-- CreateIndex
CREATE UNIQUE INDEX "Filler_phoneNumber_key" ON "Filler"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_phoneNumber_key" ON "SuperAdmin"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DataEncoder_phoneNumber_key" ON "DataEncoder"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
