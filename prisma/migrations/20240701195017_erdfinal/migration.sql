/*
  Warnings:

  - You are about to drop the column `userId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `DataEncoder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SuperAdmin` table. All the data in the column will be lost.
  - Added the required column `userType` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `DataEncoder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "userId",
ADD COLUMN     "userType" "UserType" NOT NULL;

-- AlterTable
ALTER TABLE "DataEncoder" DROP COLUMN "userId",
ADD COLUMN     "userType" "UserType" NOT NULL;

-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "userId",
ADD COLUMN     "userType" "UserType" NOT NULL;
