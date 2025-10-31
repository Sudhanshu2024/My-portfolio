-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "preview" TEXT,
    "body" TEXT,
    "thumbnail" TEXT,
    "tags" TEXT[],
    "demoUrl" TEXT,
    "githubUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "dateCompleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
