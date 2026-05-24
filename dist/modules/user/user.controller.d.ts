import type { Request, Response } from "express";
export declare const userController: {
    createUser: (req: Request, res: Response) => Promise<void>;
    getAllUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSingleUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=user.controller.d.ts.map