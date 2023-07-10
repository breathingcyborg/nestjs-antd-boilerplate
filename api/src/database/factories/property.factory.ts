import { Constructable, FactorizedAttrs, Factory, SingleSubfactory } from '@jorgebodega/typeorm-factory';
import { DataSource } from 'typeorm';
import { dataSource } from '../datasource';
import { Property } from '../../properties/entities/property.entity';
import { faker, fakerEN_GB } from '@faker-js/faker';
import { AreaUnit, LandUse, ListingType, PropertyType } from '../../properties/enums';
import { toWktPoint } from '../../common/utils/wkt';
import { UserFactory } from './user.factory';
import { UserRole } from '../../users/entities/user.entity';

export class PropertyFactory extends Factory<Property> {

    protected entity: Constructable<Property> = Property;
    protected dataSource: DataSource = dataSource;

    protected attrs(): FactorizedAttrs<Property> {
        const listingType = faker.helpers.enumValue(ListingType);
        const propertyType = faker.helpers.enumValue(PropertyType);

        const areaUnit = faker.helpers.enumValue(AreaUnit);
        const areaBounds = {
            [AreaUnit.Acre]: { min: 0.5, max: 5 },
            [AreaUnit.Sqft]: { min: 100, max: 2000 },
            [AreaUnit.Sqm]: { min: 10, max: 100 },
            [AreaUnit.Sqyard]: { min: 10, max: 100 },
        }[areaUnit];
        const area = faker.number.float(areaBounds).toString();

        const location = faker.location.nearbyGPSCoordinate({
            origin: [51.5085300, -0.1257400],
            radius: 200,
            isMetric: true,
        });
        const point = toWktPoint(location[0].toString(), location[1].toString());

        const commonAttrs: FactorizedAttrs<Property> = {
            listingType,
            propertyType,
            areaUnit,
            area,
            coordinates: point,
            user: new SingleSubfactory(UserFactory, { role: UserRole.User }),
        };

        return {
            ...commonAttrs,
            ...this.getAppartmentAttrs(commonAttrs),
            ...this.getLandAttrs(commonAttrs),
            ...this.getShopAttrs(commonAttrs),
        }
    }

    private getAppartmentAttrs(
        commonAttrs: FactorizedAttrs<Property>
    ): FactorizedAttrs<Property> {
        if (commonAttrs.propertyType !== PropertyType.Apartment) {
            return {};
        }
        const totalFloors = faker.number.int({ min: 1, max: 10 });
        const floor = faker.number.int({ min: 1, max: totalFloors });
        const bhk = faker.number.int({ min: 1, max: 3 });
        const title = `${bhk} BHK appartment @ ${faker.location.streetAddress()}`

        return {
            totalFloors,
            floor,
            bhk,
            title,
        }
    }

    private getLandAttrs(
        commonAttrs: FactorizedAttrs<Property>
    ): FactorizedAttrs<Property> {
        if (commonAttrs.propertyType !== PropertyType.Land) {
            return {};
        }
        const landUse = faker.helpers.enumValue(LandUse);
        const title = `${landUse} Land in ${fakerEN_GB.location.county()}`;
        return {
            landUse,
            title,
        }
    }

    private getShopAttrs(
        commonAttrs: FactorizedAttrs<Property>
    ): FactorizedAttrs<Property> {
        if (commonAttrs.propertyType !== PropertyType.Shop) {
            return {};
        }
        const title = `Shop @ ${fakerEN_GB.location.streetAddress()}`;
        return {
            frontageArea: faker.number.int({ min: 3, max: 15 }),
            title,
        }
    }
}