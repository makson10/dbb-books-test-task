import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async doesPasswordMatch(
    enteredPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}
