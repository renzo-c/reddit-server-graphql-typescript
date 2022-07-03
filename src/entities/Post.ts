import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import 'reflect-metadata';

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property()
    createdAt?: Date = new Date();

    @Property({onUpdate: () => new Date()})
    updatedAt? = new Date();

    @Property()
    title!: string;
}