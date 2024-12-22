-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "courses" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
