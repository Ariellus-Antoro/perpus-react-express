/*
  Warnings:

  - The primary key for the `borrowings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `borrowings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `borrowing_id` on the `fines` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `fines` DROP FOREIGN KEY `fines_borrowing_id_fkey`;

-- AlterTable
ALTER TABLE `borrowings` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `fines` MODIFY `borrowing_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `nik` VARCHAR(20) NULL;

-- AddForeignKey
ALTER TABLE `fines` ADD CONSTRAINT `fines_borrowing_id_fkey` FOREIGN KEY (`borrowing_id`) REFERENCES `borrowings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
