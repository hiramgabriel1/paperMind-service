import bcrypt from "bcrypt"

export const HashPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed)
}