export interface Timer {
    id?: number;
    userId: number;
    setId: number;
    timeMs: number;
    type: string;
}
export type Credintials = {
    email: string;
    password: string;
}

export interface User {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    email: string;
    password: string;
    sessionToken?: string;
    refreshToken?: string;
}

export type UserTypes = User | User[]
export type StringTypes = string | string[]

export type QueryBody = StringTypes | UserTypes

export interface QueryResponse {
    body: QueryBody;
    resCount: number;
    query: string;
}

export interface TimerSets {
    id: number;
    userId: number;
    name: string | null;
    timerOrder: number[];
}

export interface DBQueryResponse {
    body: any[];
    resCount?: number;
    status: "SUCCESS" | "FAILURE";
    query: string;
}
export interface DBErrorResponse {
    body: any[];
    resCount?: number;
    field: string;
    status: "SUCCESS" | "FAILURE";
    query: string;
}
