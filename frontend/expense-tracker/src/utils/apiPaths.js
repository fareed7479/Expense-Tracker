// export const BASE_URL = "http://localhost:8000";


// //utils/apipaths.js
// export const API_PATHS = {
//     AUTH : {
//         LOGIN : "/api/v1/auth/login",
//         REGISTER : "/api/v1/auth/register",
//         GET_USER_INFO : "/api/v1/auth/getUser",
//     },
//     DASHBOARD : {
//         GET_DATA : "/api/v1/dashboard",
//     },
//     INCOME : {
//         ADD_INCOME : "/api/v1/income/add",
//         GET_ALL_INCOME : "/api/v1/income/get",
//         DELETE_INCOME :(incomeId) => `/api/v1/income/${incomeId}`,
//         DOWNLOAD_INCOME : '/api/v1/income/downloadexcel',
//     },
//     EXPENSE : {
//         ADD_EXPENSE : "/api/v1/expense/add",
//         GET_ALL_EXPENSE : "/api/v1/expense/get",
//         DELETE_EXPENSE :(expenseId) => `/api/v1/expense/${expenseId}`,
//         DOWNLOAD_EXPENSE : '/api/v1/expense/downloadexcel',
//     },

//     IMAGE : {
//         UPLOAD_IMAGE : "/api/v1/auth/upload-image",
//     },
// };


export const BASE_URL = "https://expense-tracker-back-five.vercel.app";

//utils/apipaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/api/v1/auth/login`,
        REGISTER: `${BASE_URL}/api/v1/auth/register`,
        GET_USER_INFO: `${BASE_URL}/api/v1/auth/getUser`,
    },
    DASHBOARD: {
        GET_DATA: `${BASE_URL}/api/v1/dashboard`,
    },
    INCOME: {
        ADD_INCOME: `${BASE_URL}/api/v1/income/add`,
        GET_ALL_INCOME: `${BASE_URL}/api/v1/income/get`,
        DELETE_INCOME: (incomeId) => `${BASE_URL}/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: `${BASE_URL}/api/v1/income/downloadexcel`,
    },
    EXPENSE: {
        ADD_EXPENSE: `${BASE_URL}/api/v1/expense/add`,
        GET_ALL_EXPENSE: `${BASE_URL}/api/v1/expense/get`,
        DELETE_EXPENSE: (expenseId) => `${BASE_URL}/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: `${BASE_URL}/api/v1/expense/downloadexcel`,
    },
    IMAGE: {
        UPLOAD_IMAGE: `${BASE_URL}/api/v1/auth/upload-image`,
    },
};
