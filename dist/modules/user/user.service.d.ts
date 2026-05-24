import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (payLoad: IUser) => Promise<import("pg").QueryResult<any>>;
    getAllUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleUsersFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updatedUserFromDB: (payLoad: IUser, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteUsersFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map