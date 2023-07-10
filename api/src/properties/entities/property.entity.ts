import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ListingType, AreaUnit, LandUse, PropertyType } from "../enums";
import { parseWktPoint, toWktPoint } from "../../common/utils/wkt";

@Entity()
export class Property {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @ManyToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: User

    @Column({ type: 'text', nullable: true, default: null })
    description: string | null

    @Column()
    listingType: ListingType

    @Column()
    propertyType: PropertyType

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    area: string

    @Column()
    areaUnit: AreaUnit

    @Column({ 
        type: 'int',  
        unsigned: true,
        nullable: true, 
        default: null, 
    })
    floor: number | null

    @Column({
        type: 'int',
        unsigned: true,
        nullable: true,
        default: null,
    })
    totalFloors: number | null

    @Column({
        type: 'int',
        nullable: true,
        default: null      
    })
    bhk: number | null

    @Column({ 
        nullable: true, 
        default: null,
    })
    landUse: LandUse | null

    @Column({
        type: 'int',
        nullable: true,
        default: null,
    })
    frontageArea: number | null; // in feet

    @Column({ type: 'point' })
    coordinates: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    setCoords(lat: string, lng: string) {
        this.coordinates = toWktPoint(lat, lng);
    }

    get lat() {
        const parsed = parseWktPoint(this.coordinates);
        if (!parsed) {
            return null;
        }
        return parsed.lat;
    }

    get lng() {
        const parsed = parseWktPoint(this.coordinates);
        if (!parsed) {
            return null;
        }
        return parsed.lng;
    }
}