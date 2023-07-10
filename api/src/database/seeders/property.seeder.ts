import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { PropertyFactory } from '../factories/property.factory';

export default class PropertySeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        await new PropertyFactory().createMany(50);
    }
}