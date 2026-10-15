
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import type { RegisterInput } from '../validation/authValidation.js';

export async function registerUser(regDetails: RegisterInput) {
  const passwordHash = await bcrypt.hash(regDetails.password, 10);

  const user = await User.create({
    username: regDetails.username,
    email: regDetails.email,
    hash_pass: passwordHash,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}
