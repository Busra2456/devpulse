import type { IIssue } from "./issues.interface";
export declare const issuesService: {
    createIssueIntoDB: (payload: IIssue, userId: string) => Promise<any>;
    getAllIssuesFromDB: (query: Record<string, unknown>) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: {
            id: any;
            name: any;
            role: any;
        };
        created_at: any;
        updated_at: any;
    }[]>;
    getSingleIssueFromDB: (id: string) => Promise<any>;
    updateIssueFromDB: (id: string, payload: Partial<IIssue>) => Promise<any>;
    deleteIssueFromDB: (id: string) => Promise<any>;
    getReporterById: (id: number) => Promise<any>;
};
//# sourceMappingURL=issues.service.d.ts.map