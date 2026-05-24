import type { Request, Response } from "express";
export declare const issuesController: {
    createIssue: (req: Request, res: Response) => Promise<void>;
    getAllIssues: (req: Request, res: Response) => Promise<void>;
    getSingleIssue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateIssue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteIssue: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=issues.controller.d.ts.map