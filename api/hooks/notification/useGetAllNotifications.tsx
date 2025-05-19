import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/api/store/store";
import {getAllNotification} from "@/api/features/Notification/notificationThunk";
export const useGetAllNotification = () => {
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();

    // Memoize the selector to prevent unnecessary recalculations
    const {notification, currentPage, lastPage, loading, error} = useSelector(
        (state: any) => state.notification,
        // This is the equality function - only update if values change
        (prev, next) =>
            prev.invoices === next.invoices &&
            prev.currentPage === next.currentPage &&
            prev.lastPage === next.lastPage &&
            prev.loading === next.loading &&
            prev.error === next.error
    );

    // Use useCallback to memoize the function
    const fetchData = useCallback(async () => {
        try {
            await dispatch(getAllNotification()).unwrap();
            // The console.log should use the latest state from Redux, not the closure value
        } catch (error) {
            console.error("Error fetching notification:", error);
            // Handle error properly instead of just throwing Error constructor
        }
    }, [dispatch, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData already has page in its dependencies

    const loadMore = useCallback(() => {
        if (currentPage < lastPage && !loading) {
            setPage((prev) => prev + 1);
        }
    }, [currentPage, lastPage, loading]);

    const refetchProducts = useCallback(() => {
        return fetchData();
    }, [fetchData]);

    // Return memoized values
    return {

        lastPage,
        loading,
        error,
        notification,
        refetchProducts
    };
};