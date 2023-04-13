import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column((type) => Category)
  categories: Category[];

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
