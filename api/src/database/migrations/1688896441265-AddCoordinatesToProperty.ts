import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoordinatesToProperty1688896441265 implements MigrationInterface {
    name = 'AddCoordinatesToProperty1688896441265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`property\` ADD \`coordinates\` point NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`property\` DROP COLUMN \`coordinates\``);
    }

}
