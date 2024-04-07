import { CustomBaseEntity } from 'src/common/base/baseEntity.entity';
import { Entity, Column } from 'typeorm';
import * as bcrypt from "bcryptjs";

@Entity()
export class UsersEntity extends CustomBaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;


  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
