import jwt, {} from "jsonwebtoken";
import { pool } from "../db/index";
import config from "../config/index";
const auth = (...roles) => {
    return async (req, res, next) => {
        // console.log(roles);
        try {
            const token = req.headers.authorization;
            // console.log(token);
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!",
                });
            }
            const decoded = jwt.verify(token, config.secret);
            const userData = await pool.query(`
     SELECT * FROM users WHERE email=$1   
        `, [decoded.email]);
            // console.log(userData);
            const user = userData.rows[0];
            // console.log(user);
            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!",
                });
            }
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!!,This role have no access!",
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map