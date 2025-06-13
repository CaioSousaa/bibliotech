import * as bcrypt from "bcrypt";

export async function hashPasswordFunction(password: string): Promise<string> {
  const salt = 10;

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}
