-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT,
    "aboutMe" TEXT,
    "contact" TEXT,
    "title" TEXT,
    "headline" TEXT,
    "githubUrl" TEXT,
    "linkedUrl" TEXT,
    "workEmail" TEXT,
    "publishPortfolio" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
