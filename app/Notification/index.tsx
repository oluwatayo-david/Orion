import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import { useRouter } from "expo-router";
import axios from "axios";
import {useGetAllNotification} from "@/api/hooks/notification/useGetAllNotifications";
export default function Notification() {
    const [selectedTab, setSelectedTab] = useState("All");
    const router = useRouter();
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 const {notification}= useGetAllNotification()
    // Sample notification data from the payload (we'll replace this with API call)
    const notifications = [
        {
            "_id": "6828c239de65360bd30b19bf",
            "_user": "68272a3b36b42e40265af1fb",
            "action": "transfer",
            "createdAt": "2025-05-17T17:07:05.254Z",
            "message": "You sent ₦1000 to fred adogo",
            "name": "fred adogo",
            "target": "TRF-1747501625076",
            "title": "Transfer Sent",
            "updatedAt": "2025-05-17T21:20:46.901Z",
            "view": true,
            "amount": "1000"
        },
        {
            "_id": "6828e54020f3fe50273e01ba",
            "_user": "68272a3b36b42e40265af1fb",
            "action": "transfer",
            "amount": "500",
            "createdAt": "2025-05-17T19:36:32.487Z",
            "message": "You sent ₦500 to fred adogo",
            "name": "fred adogo",
            "target": "TRF-1747510592272",
            "title": "Transfer Sent",
            "updatedAt": "2025-05-17T21:20:46.901Z",
            "view": false
        }
    ];

    // In a real app, fetch notifications from API
    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            // In production, replace with actual API call:
            // const response = await axios.get('/notification');
            // const fetchedNotifications = response.data.data;

            // For now, using our sample data:
            const fetchedNotifications = notification;

            // Separate notifications into read and unread
            const unread = fetchedNotifications.filter(notif => !notif.view);
            const read = fetchedNotifications.filter(notif => notif.view);

            setUnreadNotifications(unread);
            setReadNotifications(read);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            Alert.alert("Error", "Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Function to mark notification as read
    const markAsRead = async (notificationId:any) => {
        try {

             await axios.get('http://192.168.137.1:3000/notification/viewed');

            // For now, just update the UI state
            const updatedUnread = unreadNotifications.filter(n => n._id !== notificationId);
            const notificationToMove = unreadNotifications.find(n => n._id === notificationId);

            if (notificationToMove) {
                notificationToMove.view = true;
                setReadNotifications([notificationToMove, ...readNotifications]);
                setUnreadNotifications(updatedUnread);
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Function to handle clearing all notifications
    const handleClearAll = async () => {
        try {
            Alert.alert(
                "Clear Notifications",
                "Are you sure you want to clear all notifications?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Clear All",
                        onPress: async () => {
                            // In production, you might want to add an API endpoint to clear all notifications
                            setUnreadNotifications([]);
                            setReadNotifications([]);
                            Alert.alert("Success", "All notifications cleared");
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Error clearing notifications:", error);
            Alert.alert("Error", "Failed to clear notifications");
        }
    };

    // Function to determine notification background color based on action type
    const getNotificationColor = (action, isRead) => {
        if (isRead) {
            return action === " " ? "bg-[#8FBDBD]" : "bg-[#EDC7C5]";
        } else {
            return action === "deposit"  || action === "transfer"? "bg-primary" : "bg-[#FF3B30]";
        }
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Extract transaction details from notification
    const prepareTransactionDetailsParams = (notification) => {
        // Extract target ID (transaction ID) from notification
        const transactionId = notification.target || "";
        // Create payment status based on action or other fields if available
        const status = notification.status || "success"; // Default to success if not specified

        return {
            status,
            amount: notification.amount ? `₦${notification.amount}` : "₦0",
            accountName: notification.name || "",
            accountNumber: "2517706764",
            remark: notification.message || "",
            transactionId,
            date: notification.createdAt,
            errorMessage: notification.errorMessage || ""
        };
    };

    // Handle notification click
    const handleNotificationPress = async (notification) => {
        try {
            // Mark as read if it's unread
            if (!notification.view) {
                await markAsRead(notification._id);
            }

            // Navigate to transaction details with params
            const params = prepareTransactionDetailsParams(notification);
            router.push({
                pathname: "/Notification/[id]",
                params
            });
        } catch (error) {
            console.error("Error handling notification press:", error);
        }
    };

    // Render a single notification item
    const renderNotificationItem = (notification, isRead) => {
        const bgColor = getNotificationColor(notification.action, isRead);
        const iconFill = notification.action === "transfer "  || notification.action === "deposit "? "#FF3B30" : undefined;

        return (
            <TouchableOpacity
                key={notification._id}
                className={`${bgColor} px-2 py-3 flex-row gap-2 rounded-lg mb-4`}
                onPress={() => handleNotificationPress(notification)}
            >
                <View className="bg-white rounded-lg py-2 px-2 flex justify-center items-center">
                    <OrionIcon width={30} height={30} fill={iconFill} />
                </View>
                <View className="flex-1 flex-col">
                    <Text className="text-white font-semibold" numberOfLines={1} ellipsizeMode="tail">
                        {notification.title}
                    </Text>
                    <Text className="text-white flex-wrap">
                        {notification.message}
                    </Text>
                    <Text className="text-white text-xs mt-1">
                        {formatDate(notification.createdAt)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-4 pt-4">
            {/* Header */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold ml-2">Notifications</Text>
                </View>

                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={handleClearAll}
                    disabled={unreadNotifications.length === 0 && readNotifications.length === 0}
                >
                    <Text className="text-lg font-semibold ml-2 text-primary">Clear</Text>
                    <Feather name="x" size={24} color="#008080" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
                {/* Loading indicator */}
                {isLoading && (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text>Loading notifications...</Text>
                    </View>
                )}

                {/* Empty state */}
                {!isLoading && unreadNotifications.length === 0 && readNotifications.length === 0 && (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Feather name="bell-off" size={50} color="#8FBDBD" />
                        <Text className="mt-4 text-gray-500 text-center">
                            No notifications yet
                        </Text>
                    </View>
                )}

                {/* Unread notifications section */}
                {!isLoading && unreadNotifications.length > 0 && (
                    <View>
                        <View className="my-4">
                            <Text className="font-medium">
                                Unread Notifications
                            </Text>
                        </View>

                        {unreadNotifications.map(notification =>
                            renderNotificationItem(notification, false)
                        )}
                    </View>
                )}

                {/* Read notifications section */}
                {!isLoading && readNotifications.length > 0 && (
                    <View>
                        <View className="my-4">
                            <Text className="font-medium">
                                Read Notifications
                            </Text>
                        </View>

                        {readNotifications.map(notification =>
                            renderNotificationItem(notification, true)
                        )}
                    </View>
                )}

                {/* Add padding at the bottom for better scrolling */}
                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}
