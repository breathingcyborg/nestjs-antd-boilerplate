import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToPropertyTable1688647092638 implements MigrationInterface {
    name = 'AddUserToPropertyTable1688647092638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`property\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`property\` ADD CONSTRAINT \`FK_d90007b39cfcf412e15823bebc1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`property\` DROP FOREIGN KEY \`FK_d90007b39cfcf412e15823bebc1\``);
        await queryRunner.query(`ALTER TABLE \`property\` DROP COLUMN \`userId\``);
    }

}
