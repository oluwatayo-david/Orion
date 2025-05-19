import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/request/axiosInstance";
import {SignupData} from "@/api/interfaces/authInterface";
import {mmkvStorage} from "@/api/storage/mmkvStorage";


export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData: SignupData, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.post("/api/v1/auth/register", userData);
            const token = response.data?.data?.access_token;
            console.log(token)
            await mmkvStorage.setItem("token", token);

            console.log(response.data)


            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
);

//  Login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials);
            const token = response.data?.token;
            console.log(token)
            await mmkvStorage.setItem("token", token);

            console.log(response.data)


            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.post("/api/v1/auth/logout");
            console.log(response.data)
            await mmkvStorage.removeItem("token");
            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
)


export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async (credentials: { email: string; otp: string }, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/api/v1/auth/verify_otp", credentials);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.log(error.response?.data || error.message);
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
)


export const resendUserOtp = createAsyncThunk(
    'auth/resendUserOtp',
    async (credentials: { email: string }, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.post("/api/v1/auth/send-otp", credentials);
            console.log(response.data)
            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
)

// Refresh Token
export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/refresh");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

