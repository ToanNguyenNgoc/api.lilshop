import bcrypt from "bcrypt"

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(5)
  const password_hashed = await bcrypt.hash(password, salt)
  return password_hashed
}
export const comparePassword = async (newPass: string, oldPass: string) => bcrypt.compare(newPass, oldPass)