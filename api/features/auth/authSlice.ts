import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, refreshToken, resendUserOtp, signupUser, verifyUser} from "./authThunks";

interface AuthState {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
    resendOtpLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    resendOtpLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
        // Reducer to handle deposit - increase wallet amount
        updateWalletDeposit: (state, action) => {
            if (state.user && state.user._wallet) {
                // Update the wallet amount with the new balance from payload
                state.user._wallet.amount = action.payload.data.newBalance;
                // Also update inflow for tracking purposes
                if (state.user._wallet.inflow) {
                    state.user._wallet.inflow += Number(action.payload.data.amount);
                } else {
                    state.user._wallet.inflow = Number(action.payload.data.amount);
                }
            }
        },
        // Reducer to handle withdrawal/transfer - decrease wallet amount
        updateWalletWithdrawal: (state, action) => {
            if (state.user && state.user._wallet) {
                // Update the wallet with new balance from payload
                state.user._wallet.amount = action.payload.data.newBalance;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //  Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data?.data?.user;
                state.error = null;

            })
            .addCase(signupUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;

            })


            //  Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user;
                state.error = null;
                console.log('user', action.payload.user)

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;

            })
            //verify otp
            .addCase(verifyUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.token = action.payload.data.access_token;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })
            //resendOtp
            .addCase(resendUserOtp.pending, (state) => {
                state.resendOtpLoading = true;
            })
            .addCase(resendUserOtp.fulfilled, (state, action) => {
                state.resendOtpLoading = false;
                state.user = action.payload.data.user;
                // state.token = action.payload.data.access_token;
            })
            .addCase(resendUserOtp.rejected, (state, action) => {
                state.resendOtpLoading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;
            })

            // // Logout

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = null;

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload && typeof action.payload === "object"
                    ? (action.payload as any).message || "An unknown error occurred"
                    : action.payload as string;

            })

            // Refresh Token
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
            });
    },
});

export const {clearAuthState, updateWalletDeposit, updateWalletWithdrawal} = authSlice.actions;
export default authSlice.reducer;