-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "source_link" VARCHAR(256) NOT NULL,
    "source_id" INTEGER NOT NULL,
    "description" TEXT,
    "short_description" TEXT,
    "location" VARCHAR(256),
    "address" VARCHAR(256),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "price" DECIMAL(65,30),
    "image_link" VARCHAR(256),
    "organizer" VARCHAR(256),
    "last_inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "link" VARCHAR(256) NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "last_inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "last_inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_to_category" (
    "event_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "event_id_category_id_unique" ON "event_to_category"("event_id", "category_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_to_category" ADD CONSTRAINT "event_to_category_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_to_category" ADD CONSTRAINT "event_to_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
