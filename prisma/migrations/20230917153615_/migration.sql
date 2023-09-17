/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `document` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `Users_Roles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "document" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "type_document" INTEGER NOT NULL,
    "number_phone" INTEGER NOT NULL,
    "registration_date" DATETIME NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    CONSTRAINT "Users_type_document_fkey" FOREIGN KEY ("type_document") REFERENCES "Type_document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("address", "birth_date", "document", "last_name", "name", "number_phone", "registration_date", "state", "type_document") SELECT "address", "birth_date", "document", "last_name", "name", "number_phone", "registration_date", "state", "type_document" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE TABLE "new_Users_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "Users_Roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("document") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_Roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users_Roles" ("id", "role_id", "user_id") SELECT "id", "role_id", "user_id" FROM "Users_Roles";
DROP TABLE "Users_Roles";
ALTER TABLE "new_Users_Roles" RENAME TO "Users_Roles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
