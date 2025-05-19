// Custom Hooks for Savings
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "@/api/store/store";
import {
    getSavingsPlans,
    createSavingsPlan,
    breakSavings
} from "@/api/features/savings/savingThunks";
import { resetSavingsSuccess } from "@/api/features/savings/savingsSlice";
import { useEffect } from "react";

// Hook for getting and managing savings plans
export const useSavings = () => {
    const dispatch = useAppDispatch();
    const {
        savingsPlans,
        totalSavings,
        loading,
        error
    } = useSelector((state: RootState) => state.savings);

    const fetchSavingsPlans = async () => {
        return dispatch(getSavingsPlans()).unwrap();
    };

    useEffect(() => {
        // Fetch savings plans when the hook is first used
        fetchSavingsPlans();
    }, []);

    return {
        savingsPlans,
        totalSavings,
        loading,
        error,
        refetch: fetchSavingsPlans
    };
};

// Hook for creating savings plans
export const useCreateSavings = () => {
    const dispatch = useAppDispatch();
    const {
        creatingPlan,
        error,
        success
    } = useSelector((state: RootState) => state.savings);

    const createPlan = async (savingsData: any) => {
        return dispatch(createSavingsPlan(savingsData)).unwrap();
    };

    const resetSuccess = () => {
        dispatch(resetSavingsSuccess());
    };

    return {
        createPlan,
        creatingPlan,
        error,
        success,
        resetSuccess
    };
};

// Hook for breaking savings
export const useBreakSavings = () => {
    const dispatch = useAppDispatch();
    const {
        breakingPlan,
        error
    } = useSelector((state: RootState) => state.savings);

    const breakPlan = async (savingsId: string) => {
        return dispatch(breakSavings({ savingsId })).unwrap();
    };

    return {
        breakPlan,
        breakingPlan,
        error
    };
};