import { PartialType } from "@nestjs/swagger";
import { CreateUser } from "./createUser.dto";

export class UpdateUser extends PartialType(CreateUser)  {
 
}
