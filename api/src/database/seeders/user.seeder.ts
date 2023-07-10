import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { hashPassword } from '../../auth/utils/password';
import { User, UserRole } from '../../users/entities/user.entity';
import { UserFactory } from '../factories/user.factory';

export default class UserSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        await this.createSuperAdmin(dataSource);
        await new UserFactory().createMany(10, { role: UserRole.User });
    }

    private async createSuperAdmin(dataSource: DataSource) {

        const userRepo = dataSource.getRepository(User);

        const email = 'admin@admin.com';
        const password = await hashPassword('password');
    
        let superAdmin = await userRepo.findOneBy({
            email,
            role: UserRole.Admin,
        });
    
        if (!superAdmin) {
            superAdmin = await (new UserFactory().make({
                email,
                role: UserRole.Admin,
                passwordHash: password,
            }))
        }

        await userRepo.save(superAdmin);
    }
}