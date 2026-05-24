import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index";
import { pool } from "../../db/index";
const loginUserIntoDB = async (payload) => {
    const { email, password } = payload;
    const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Invalid Credentials!");
    }
    const jwtpayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    };
    const accessToken = jwt.sign(jwtpayload, config.secret, {
        expiresIn: "1d",
    });
    return {
        token: accessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        },
    };
};
export const authService = {
    loginUserIntoDB
};
//# sourceMappingURL=auth.service.js.map