import {createSlice} from "@reduxjs/toolkit";
import {getAllNotification} from "@/api/features/Notification/notificationThunk";


const initialState  = {
    notification: null,
    loading: false,
    error: null,

};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.notification = null;
            state.loading = false;
            state.error = null;

        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notification = action.payload.data;
  console.log('notificarion',state.notification)
            })
            .addCase(getAllNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })


    },
});

export const {clearAuthState} = notificationSlice.actions;
export default notificationSlice.reducer;