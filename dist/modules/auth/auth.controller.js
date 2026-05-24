import { authService } from "./auth.service";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const authController = {
    loginUser
};
//# sourceMappingURL=auth.controller.js.map