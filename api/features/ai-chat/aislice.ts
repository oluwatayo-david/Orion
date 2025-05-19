import {createSlice} from "@reduxjs/toolkit";
import {chat} from "@/api/features/ai-chat/chatthrunk";

const initialState  = {
    chats: null,
    loading: false,
    error: null,

};

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.chats =null;
            state.loading = false;
            state.error = null;

        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(chat.pending, (state) => {
                state.loading = true;
            })
            .addCase(chat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload.message;
                console.log('chats......',state.chats)
            })
            .addCase(chat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })


    },
});

export const {clearAuthState} = aiSlice.actions;
export default aiSlice.reducer;