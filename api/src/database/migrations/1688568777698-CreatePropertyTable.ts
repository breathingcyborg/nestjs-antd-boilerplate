import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePropertyTable1688568777698 implements MigrationInterface {
    name = 'CreatePropertyTable1688568777698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`property\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`listingType\` varchar(255) NOT NULL, \`propertyType\` varchar(255) NOT NULL, \`area\` decimal(10,2) NOT NULL, \`areaUnit\` varchar(255) NOT NULL, \`floor\` int UNSIGNED NULL, \`totalFloors\` int UNSIGNED NULL, \`bhk\` int NULL, \`landUse\` varchar(255) NULL, \`frontageArea\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`property\``);
    }

}
