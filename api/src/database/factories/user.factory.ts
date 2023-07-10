import { Constructable, FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { User, UserRole } from '../../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { dataSource } from '../datasource';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../auth/utils/password';

export class UserFactory extends Factory<User> {

    protected entity: Constructable<User> = User;
    protected dataSource: DataSource = dataSource;

    protected attrs() : FactorizedAttrs<User> {
        return {
            displayName: faker.person.fullName(),
            email: faker.internet.email(),
            passwordHash: async () => await hashPassword("password"),
            role: faker.helpers.arrayElement(Object.values(UserRole)),
        }
    }
}