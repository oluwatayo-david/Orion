import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/api/store/store";
import {loginUser, logoutUser, resendUserOtp, signupUser, verifyUser} from "@/api/features/auth/authThunks";
import {SignupData} from "@/api/interfaces/authInterface";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const {user, loading, error, token, resendOtpLoading} = useSelector((state: RootState) => state.auth);

    const signup = async (userData: SignupData) => {
        return dispatch(signupUser(userData)).unwrap();
    };

    const verifyOtp = async (userData) => {
        return dispatch(verifyUser(userData)).unwrap();
    };


    const resendOtp = async (userData) => {
        return dispatch(resendUserOtp(userData)).unwrap();
    };

    const login = async (userData) => {
        return dispatch(loginUser(userData)).unwrap();
    };

    const logout = async () => {
        return dispatch(logoutUser()).unwrap();
    };
    // login function
    // const login = async (email: string, password: string) => {
    //     return dispatch(loginUser({email, password}));
    // };
    //
    //  Logout function
    // const logout = async () => {
    //     return dispatch(logoutUser());
    // };

    return {
        user,
        loading,
        error,
        signup,
        token,
        login,
        verifyOtp,
        resendOtp, resendOtpLoading,
        logout
        // login,
        // logout,
    };
};
