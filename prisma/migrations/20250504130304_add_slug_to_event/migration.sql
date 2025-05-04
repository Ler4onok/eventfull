/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "slug" VARCHAR(256);

-- CreateIndex
CREATE UNIQUE INDEX "event_slug_key" ON "event"("slug");
