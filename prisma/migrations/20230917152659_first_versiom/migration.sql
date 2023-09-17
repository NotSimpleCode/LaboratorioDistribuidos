-- CreateTable
CREATE TABLE "Type_document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_document" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "document" BIGINT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "Users_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" BIGINT NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "Users_Roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("document") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_Roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_date" DATETIME NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
