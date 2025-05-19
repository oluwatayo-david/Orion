import {
    View,
    Text,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useState, useEffect, useRef, memo } from "react";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import OrionLogo from "@/assets/svgs/orionLogo";
import OrionIcon from "@/assets/svgs/orionIcon";
import { useAuth } from "@/api/hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { useChat } from "@/api/hooks/useChat";

export default function AiChat() {
    const { user } = useAuth();
    const [messages, setMessages] = useState(user?.chatHistory || []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { chatAi, chats, loading, error } = useChat();
    const flatListRef = useRef(null);
    const lastChatsRef = useRef(null);

    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            message: ""
        }
    });

    // Get the current value of the message field
    const value = watch("message");

    // Use this effect to watch for changes in the chats state from Redux
    useEffect(() => {
        // Only process if chats has changed and is not null
        if (chats !== null && chats !== lastChatsRef.current) {
            console.log('New chat response detected:', chats);
            lastChatsRef.current = chats;

            // Add the bot response to messages
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                content: chats, // Use chats directly as set in your slice
                role: "assistant"
            }]);

            // Reset submitting state
            setIsSubmitting(false);

            // Scroll to the bottom after adding the message
            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
            }, 100);
        }
    }, [chats]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const sendMessage = async (data) => {
        if (!data.message || data.message.trim() === "") return;

        // Create a new message object
        const newMessage = {
            id: Date.now().toString(),
            content: data.message,
            role: "user"
        };

        // Update messages state
        setMessages(prev => [...prev, newMessage]);
        console.log('User message sent:', data.message);

        // Clear the input field
        reset();

        // Set submitting state
        setIsSubmitting(true);

        try {
            // Call the chat API - don't try to update messages here
            // The message will be added via the useEffect when chats updates
            await chatAi({ message: data.message });
            console.log('API call complete');
        } catch (e) {
            console.log('Error in chat:', e);
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-3 pt-4">
            <View className="flex-row justify-between items-center mb-4 px-2">
                <View className="flex-row items-center">
                    <View className="bg-blue-50 p-1 rounded-full mr-2">
                        <Ionicons name="chevron-back" size={22} color="#1a5fb4" />
                    </View>
                    <Text className="text-xl font-semibold text-gray-800">Orion Finance</Text>
                </View>
                <View className="flex-row items-center">
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </View>
            </View>

            {messages.length === 0 ? (
                <View className="flex-1 justify-center items-center px-6">
                    <View className="bg-blue-100 p-4 rounded-full mb-4">
                        <OrionIcon width={60} height={60} />
                    </View>
                    <Text className="text-xl font-medium text-gray-700 mb-2">Your Financial Assistant</Text>
                    <Text className="text-gray-500 text-center mb-8">
                        Ask me about your accounts, transactions, or for financial advice
                    </Text>
                    <View className="w-full">
                        <View className="bg-white rounded-xl shadow-sm p-4 mb-3 border border-blue-100">
                            <Text className="text-blue-800 font-medium mb-1">Try asking:</Text>
                            <Text className="text-gray-600 mb-1">• "What's my account balance?"</Text>
                            <Text className="text-gray-600 mb-1">• "Show my recent transactions"</Text>
                            <Text className="text-gray-600">• "Help me create a budget"</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={true}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View
                            className={`mb-8 my-2 rounded-lg max-w-[80%] flex-row items-start gap-2 justify-start ${
                                item.role === "user" ? "bg-primary self-end py-3 px-4 " : " self-start"
                            }`}
                        >
                            {
                                item.role === "assistant" && <OrionIcon width={30} height={30} />
                            }
                            <Text
                                className={`${item.role === "user" ? "text-white" : "text-black"} text-nowrap`}>
                                {item.content}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{padding: 16}}
                    ListFooterComponent={isSubmitting ? (
                        <View className="py-5 items-start animate-pulse">
                           <OrionIcon width={30} height={30}/>
                            <Text className="mt-2 text-gray-500">Orion is thinking...</Text>
                        </View>
                    ) : null}
                />
            )}

            {/* Input Field with React Hook Form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="px-2 py-2"
            >
                <View className="flex-row items-center bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
                    <Controller
                        control={control}
                        name="message"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                multiline={true}
                                maxLength={1000}
                                spellCheck={true}
                                onChangeText={onChange}
                                editable={!isSubmitting}
                                placeholder={isSubmitting ? "Please wait..." : "Ask about your finances..."}
                                className={`flex-1 py-2 text-base ${isSubmitting ? 'text-gray-400' : 'text-gray-800'}`}
                            />
                        )}
                    />
                    {!isSubmitting && value ? (
                        <TouchableOpacity
                            className="bg-blue-600 p-2 rounded-full ml-2"
                            onPress={handleSubmit(sendMessage)}
                            disabled={isSubmitting}
                        >
                            <Feather name="send" size={18} color="#000000" />
                        </TouchableOpacity>
                    ) : (
                        <View className="flex-row items-center gap-2">
                            <TouchableOpacity className="p-2">
                                <FontAwesome name="microphone" size={18} color="#666" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2 ml-1">
                                <Feather name="camera" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}