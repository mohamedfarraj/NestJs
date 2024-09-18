import { CustomBaseEntity } from 'src/common/base/baseEntity.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class RolesEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

}
