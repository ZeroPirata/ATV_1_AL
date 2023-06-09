import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683025684454 implements MigrationInterface {
    name = 'Default1683025684454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "nome" character varying(30) NOT NULL, CONSTRAINT "UQ_173d9ff9c179a586239de1f4c93" UNIQUE ("nome"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "idHost" integer, "idVisitor" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_host_id" FOREIGN KEY ("idHost") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idVisitor") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_visitor_id"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_host_id"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
