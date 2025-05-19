import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/api/store/store";
import {chat} from "@/api/features/ai-chat/chatthrunk";

export const useChat = () => {
    const dispatch = useAppDispatch();
    const {chats, loading, error} = useSelector((state: RootState) => state.ai);

    const chatAi = async (userData:any) => {
        return dispatch(chat(userData)).unwrap();
    };



    return {
        loading,
        error,
        chatAi  ,
chats
    };
};
