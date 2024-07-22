import { DBQueryResponse, DBErrorResponse } from "../types";

const SUCCESS = "SUCCESS"
const FAILURE = "FAILURE"

function createQueryResponse(data: any, queryString: string) {
    let response: DBQueryResponse;
    if (!data.length) {
        return data
    }
    const keywords = ["SELECT", "DELETE", "INSERT", "UPDATE"]
    const [SELECT, DELETE, INSERT, UPDATE] = keywords
    let command: string | null = null;
    for (let x of keywords) {
        if (queryString.includes(x)) {
            command = x
        }
    }
    if (command !== null) {
        switch (command) {
            case SELECT:
                response = {
                    body: data,
                    resCount: data.length,
                    query: queryString,
                    status: SUCCESS
                }
                return response;
            case DELETE:
                response = {
                    body: [data],
                    query: queryString,
                    status: SUCCESS
                }
                return response;
            case INSERT:
                response = {
                    body: [data],
                    query: queryString,
                    status: SUCCESS
                }
                return response
            case UPDATE:
                response = {
                    body: [data],
                    query: queryString,
                    status: SUCCESS
                }
                return response;
            default:
                response = {
                    body: [data],
                    query: queryString,
                    status: SUCCESS
                }
                return response
        }
    }
}

function createErrorResponse(message: string | string[] | number, queryString: string) {
    let response: DBErrorResponse;
    if (message !== null) {
        switch (message) {
            case "ER_DUP_ENTRY":
                response = {
                    body: ["Email is already registered."],
                    query: queryString,
                    field: "Email",
                    status: FAILURE
                }
                return response;
            default:
                response = {
                    body: [message],
                    query: queryString,
                    field: "undefined",
                    status: FAILURE
                }

        }
    }
}

export { createQueryResponse, createErrorResponse }
