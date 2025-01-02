import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column()
  imageUrl: string;
}
