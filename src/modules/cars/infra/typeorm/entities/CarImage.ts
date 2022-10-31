import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Car } from "./Car";


@Entity("cars_images")
class CarImage {
    @PrimaryColumn()
    id!: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "cars_id" })
    car_id!: string;

    @Column()
    image_name!: string;

    @CreateDateColumn()
    created_at!: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage }