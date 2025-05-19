// Savings Slice
import { createSlice } from "@reduxjs/toolkit";
import {
    getSavingsPlans,
    createSavingsPlan,
    breakSavings
} from "@/api/features/savings/savingThunks";

const initialState = {
    savingsPlans: [],
    totalSavings: 0,
    loading: false,
    creatingPlan: false,
    breakingPlan: false,
    error: null,
    success: false,
};

const savingsSlice = createSlice({
    name: "savings",
    initialState,
    reducers: {
        clearSavingsState: (state) => {
            state.savingsPlans = [];
            state.totalSavings = 0;
            state.loading = false;
            state.creatingPlan = false;
            state.breakingPlan = false;
            state.error = null;
            state.success = false;
        },
        resetSavingsSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Savings Plans
            .addCase(getSavingsPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSavingsPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.savingsPlans = action.payload.data.savingsHistory || [];
                state.totalSavings = action.payload.data.totalSavings || 0;
            })
            .addCase(getSavingsPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })

            // Create Savings Plan
            .addCase(createSavingsPlan.pending, (state) => {
                state.creatingPlan = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createSavingsPlan.fulfilled, (state, action) => {
                state.creatingPlan = false;
                state.success = true;
                // Optionally update the state with the new plan
                // This depends on how your backend response is structured
            })
            .addCase(createSavingsPlan.rejected, (state, action) => {
                state.creatingPlan = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })

            // Break Savings
            .addCase(breakSavings.pending, (state) => {
                state.breakingPlan = true;
                state.error = null;
            })
            .addCase(breakSavings.fulfilled, (state, action) => {
                state.breakingPlan = false;
                // You may want to update the state based on the response
                // Remove the broken plan from savingsPlans array
                // state.savingsPlans = state.savingsPlans.filter(plan => plan._id !== action.meta.arg.savingsId);
            })
            .addCase(breakSavings.rejected, (state, action) => {
                state.breakingPlan = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            });
    },
});

export const { clearSavingsState, resetSavingsSuccess } = savingsSlice.actions;
export default savingsSlice.reducer;