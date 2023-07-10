import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}