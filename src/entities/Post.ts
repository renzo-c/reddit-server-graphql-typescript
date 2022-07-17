import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import 'reflect-metadata';

@Entity()
export class Post {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "date" })
  createdAt? = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Property({ type: "string" })
  title!: string;
}
