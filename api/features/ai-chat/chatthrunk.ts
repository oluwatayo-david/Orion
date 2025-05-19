import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/request/axiosInstance";



export const chat = createAsyncThunk(
    "ai/chat",
    async (message, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axiosInstance.post("/ai/chat" , message);


            console.log(response.data)


            return fulfillWithValue(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);

        }
    }
);





