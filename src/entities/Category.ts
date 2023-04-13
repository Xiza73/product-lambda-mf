import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Category {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
