import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUND = 10;

@Injectable()
export class CipherService {
  hash = async (plainText): Promise<string> => {
    return await bcrypt.hash(plainText, SALT_OR_ROUND);
  };

  isHashValid = async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  };
}
