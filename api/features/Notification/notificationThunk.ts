import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/request/axiosInstance";
import {SignupData} from "@/api/interfaces/authInterface";
import {mmkvStorage} from "@/api/storage/mmkvStorage";


export const getAllNotification = createAsyncThunk(
    "notification/getAllNotification",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.get("/notification/");


            console.log(response.data)


            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
);





export const getUserNotification = createAsyncThunk(
    "notification/getUserNotification",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.get("/notification/");


            console.log(response.data)


            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
);
