CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('')) NOT NULL,
        "username" VARCHAR(100) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "email" VARCHAR(150) NOT NULL,
        "avatar" VARCHAR(255) NOT NULL,
        "firstname" VARCHAR(100) NOT NULL,
        "lastname" VARCHAR(100) NOT NULL,
        "artist_alias" VARCHAR(100) NOT NULL,
        "address" JSON NULL,
        "social_links" JSON NULL,
        "bio" TEXT NULL,
        "createdAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "location" VARCHAR(100) NULL,
        "verifiedAt" TIMESTAMP(0)
    WITH
        TIME zone NULL,
        "createdAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "tracks"(
    "id" BIGINT NOT NULL,
    "title" VARCHAR(100) NULL,
    "blurb" TEXT NOT NULL,
    "artwork" VARCHAR(255) NULL,
    "artist" BIGINT NOT NULL,
    "file" VARCHAR(150) NULL,
    "comments" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "tracks" ADD PRIMARY KEY("id");
CREATE TABLE "releases"(
    "id" BIGINT NOT NULL,
    "tracks" BIGINT NOT NULL,
    "artists" BIGINT NOT NULL,
    "blurb" TEXT NOT NULL,
    "artwork" VARCHAR(255) NOT NULL,
    "release_date" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "public" BOOLEAN NOT NULL,
        "createdAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "releases" ADD PRIMARY KEY("id");
CREATE TABLE "demos"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "artist_alias" VARCHAR(100) NOT NULL,
    "comments" BIGINT NOT NULL,
    "message" TEXT NOT NULL,
    "link" VARCHAR(100) NOT NULL,
    "status" VARCHAR(255) CHECK
        ("status" IN('')) NOT NULL,
        "createdAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "email" VARCHAR(150) NOT NULL,
        "votes" JSON NOT NULL
);
ALTER TABLE
    "demos" ADD PRIMARY KEY("id");
CREATE TABLE "comments"(
    "id" BIGINT NOT NULL,
    "author" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "comments" ADD PRIMARY KEY("id");
CREATE TABLE "subscribers"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(100) NULL,
    "email" VARCHAR(100) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT '0',
    "subscription" VARCHAR(100) NOT NULL DEFAULT 'newsletter',
    "createdAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "subscribers" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "subscribers"."subscription" IS 'newsletter, promos ... etc';
CREATE TABLE "email_metrics"(
    "id" BIGINT NOT NULL,
    "sent_to" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "transport_response" JSON NOT NULL,
        "successful" BOOLEAN NOT NULL,
        "createdAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "updatedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "email_metrics" ADD PRIMARY KEY("id");
ALTER TABLE
    "tracks" ADD CONSTRAINT "tracks_artist_foreign" FOREIGN KEY("artist") REFERENCES "users"("id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_author_foreign" FOREIGN KEY("author") REFERENCES "users"("id");
ALTER TABLE
    "releases" ADD CONSTRAINT "releases_tracks_foreign" FOREIGN KEY("tracks") REFERENCES "tracks"("id");
ALTER TABLE
    "releases" ADD CONSTRAINT "releases_artists_foreign" FOREIGN KEY("artists") REFERENCES "users"("id");
ALTER TABLE
    "tracks" ADD CONSTRAINT "tracks_comments_foreign" FOREIGN KEY("comments") REFERENCES "comments"("id");
ALTER TABLE
    "demos" ADD CONSTRAINT "demos_comments_foreign" FOREIGN KEY("comments") REFERENCES "comments"("id");