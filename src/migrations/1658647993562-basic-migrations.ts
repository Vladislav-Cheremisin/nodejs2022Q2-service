import { MigrationInterface, QueryRunner } from "typeorm";

export class basicMigrations1658647993562 implements MigrationInterface {
    name = 'basicMigrations1658647993562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav-albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_138afa02576d993a08dda780980" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav-artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_2edf86e6c55aa696321d86da633" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav-tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_6307480502410ae80eecd26dd3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fav-tracks"`);
        await queryRunner.query(`DROP TABLE "fav-artists"`);
        await queryRunner.query(`DROP TABLE "fav-albums"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "albums"`);
    }

}
