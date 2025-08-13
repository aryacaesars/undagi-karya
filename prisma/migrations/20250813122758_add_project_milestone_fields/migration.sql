-- CreateEnum
CREATE TYPE "public"."Milestone" AS ENUM ('PERENCANAAN', 'PERSIAPAN', 'PELAKSANAAN', 'FINISHING', 'SELESAI');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('ACTIVE', 'STALL', 'TERMINATED', 'FINISH');

-- AlterTable
ALTER TABLE "public"."projects" ADD COLUMN     "contractValue" DECIMAL(18,2),
ADD COLUMN     "milestone" "public"."Milestone" NOT NULL DEFAULT 'PERENCANAAN',
ADD COLUMN     "paymentTerms" TEXT,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "totalPaid" DECIMAL(18,2);

-- CreateTable
CREATE TABLE "public"."project_milestone_histories" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "previousMilestone" "public"."Milestone",
    "newMilestone" "public"."Milestone" NOT NULL,
    "progress" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "project_milestone_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."project_milestone_histories" ADD CONSTRAINT "project_milestone_histories_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
