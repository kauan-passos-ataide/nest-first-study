import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserInterface } from '../../../common/interfaces/user.interface';

@Entity()
@Unique(['id'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  age: number;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}
