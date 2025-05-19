// Savings Thunks
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/request/axiosInstance";

// Get all savings plans
export const getSavingsPlans = createAsyncThunk(
    "savings/getSavingsPlans",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axiosInstance.get("/bank/savings");
            return fulfillWithValue(response.data);
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

// Create a new savings plan
export const createSavingsPlan = createAsyncThunk(
    "savings/createSavingsPlan",
    async (savingsData: any, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axiosInstance.post("/bank/savings-lock", savingsData);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

// Break a savings plan
export const breakSavings = createAsyncThunk(
    "savings/breakSavings",
    async ({ savingsId }: { savingsId: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axiosInstance.post("/bank/break-savings", { savingsId });
            return fulfillWithValue(response.data);
        } catch (error: any) {
            console.log(error.response?.data.message || error.message);
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);