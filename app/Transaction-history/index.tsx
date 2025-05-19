// import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";
// import { useState, useEffect } from "react";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useGetAllNotification } from "@/api/hooks/notification/useGetAllNotifications";
// import { useRouter } from "expo-router";
//
// export default function TransactionHistory() {
//     const router = useRouter();
//     const { notification } = useGetAllNotification();
//     const [selectedTab, setSelectedTab] = useState("All");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//
//     // Initialize with notification data when available
//     useEffect(() => {
//         if (notification && notification.length > 0) {
//             setFilteredTransactions(notification);
//         }
//     }, [notification]);
//
//     // Handle search functionality
//     const handleSearch = (text) => {
//         setSearchQuery(text);
//         if (!text.trim()) {
//             // If search is empty, show all transactions based on selected tab
//             filterByTab(selectedTab);
//             return;
//         }
//
//         // Filter based on search text and selected tab
//         let filtered = notification.filter(item => {
//             const matchesSearch =
//                 (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
//                 (item.activity && item.activity.toLowerCase().includes(text.toLowerCase()));
//
//             if (selectedTab === "All") return matchesSearch;
//             if (selectedTab === "Sent") return matchesSearch && item.type === "debit";
//             if (selectedTab === "Received") return matchesSearch && item.type === "credit";
//             if (selectedTab === "Success") return matchesSearch && item.status === "Success";
//             if (selectedTab === "Failed") return matchesSearch && item.status === "Failed";
//
//             return matchesSearch;
//         });
//
//         setFilteredTransactions(filtered);
//     };
//
//     // Filter transactions based on selected tab
//     const filterByTab = (tab) => {
//         setSelectedTab(tab);
//
//         if (!notification || notification.length === 0) return;
//
//         let filtered;
//         switch (tab) {
//             case "Sent":
//                 filtered = notification.filter(item => item.type === "debit");
//                 break;
//             case "Received":
//                 filtered = notification.filter(item => item.type === "credit");
//                 break;
//             case "Success":
//                 filtered = notification.filter(item => item.status === "Success");
//                 break;
//             case "Failed":
//                 filtered = notification.filter(item => item.status === "Failed");
//                 break;
//             default:
//                 filtered = notification;
//         }
//
//         // Apply search filter if there's an active search
//         if (searchQuery.trim()) {
//             filtered = filtered.filter(item =>
//                 (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//                 (item.activity && item.activity.toLowerCase().includes(searchQuery.toLowerCase()))
//             );
//         }
//
//         setFilteredTransactions(filtered);
//     };
//
//     // Count transactions by type
//     const sentCount = notification ? notification.filter(item => item.type === "debit").length : 0;
//     const receivedCount = notification ? notification.filter(item => item.type === "credit").length : 0;
//     const successCount = notification ? notification.filter(item => item.status === "Success").length : 0;
//     const failedCount = notification ? notification.filter(item => item.status === "Failed").length : 0;
//     const totalCount = notification ? notification.length : 0;
//
//     // Format date function
//     const formatDate = (dateString) => {
//         if (!dateString) return "";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//     };
//
//     // Render transaction item
//     const renderTransactionItem = ({ item, index }) => (
//         <View key={index} className="flex-row justify-between items-center border-b border-gray-200 py-3 px-4">
//             <Text className="text-gray-600 text-sm ">{formatDate(item.createdAt)}</Text>
//             <Text>{item?.action}</Text>
//             <View className={`px-2 py-2 rounded-lg border border-gray-300 flex-row gap-1 items-center `}>
//                 {item.status === "Success" ?
//                     <Feather name="check-circle" size={14} color="green"/> :
//                     <Feather name="info" size={14} color="green"/>}
//                 <Text className={ "text-green-600 text-xs" }>
//                     success
//                 </Text>
//             </View>
//             <Text className="text-gray-600 text-sm  text-right">{item.name || item.activity}</Text>
//         </View>
//     );
//
//     return (
//         <SafeAreaView className="flex-1 bg-background px-4 pt-4">
//             {/* Header */}
//             <View className="flex-row items-center mb-4">
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <Ionicons name="chevron-back" size={24} />
//                 </TouchableOpacity>
//                 <Text className="text-lg font-semibold ml-2">Transaction History</Text>
//             </View>
//
//             {/* Search */}
//             <View className="border border-gray-200 rounded-xl flex-row items-center px-4 focus:outline-[#008080] focus:border-[#008080] h-14 mb-6">
//                 <Ionicons name="search" size={20} color="gray" />
//                 <TextInput
//                     className="flex-1 ml-2 text-gray-700"
//                     placeholder="Search transaction by name"
//                     value={searchQuery}
//                     onChangeText={handleSearch}
//                 />
//             </View>
//
//             {/* Filter Tabs */}
//             <View className="flex-row items-center justify-between mb-6">
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
//                     {["All", "Sent", "Received", "Success", "Failed"].map((tab) => (
//                         <TouchableOpacity
//                             key={tab}
//                             onPress={() => filterByTab(tab)}
//                             className={`px-4 py-2 rounded-lg mr-2 ${selectedTab === tab ? 'bg-primary' : 'bg-gray-200'}`}
//                         >
//                             <Text className={`${selectedTab === tab ? 'text-white' : 'text-gray-700'}`}>
//                                 {tab} {tab === "All" ? `(${totalCount})` :
//                                 tab === "Sent" ? `(${sentCount})` :
//                                     tab === "Received" ? `(${receivedCount})` :
//                                         tab === "Success" ? `(${successCount})` :
//                                             `(${failedCount})`}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>
//
//             {/* Transaction Header */}
//             <View className="flex-row justify-between items-center border-b border-gray-300 py-3 px-4 bg-gray-50 rounded-t-lg">
//                 <Text className="font-semibold w-1/5">Date</Text>
//                 <View className="flex-row items-center gap-1 w-1/5">
//                     <Text className="font-semibold">Status</Text>
//                     <View className="flex-col">
//                         <TouchableOpacity onPress={() => filterByTab("Success")}>
//                             <Feather name="chevron-up" size={12} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => filterByTab("Failed")}>
//                             <Feather name="chevron-down" size={12} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <Text className="font-semibold w-2/5 text-right">Activity</Text>
//             </View>
//
//             {/* Transactions List */}
//             {filteredTransactions && filteredTransactions.length > 0 ? (
//                 <FlatList
//                     data={filteredTransactions}
//                     renderItem={renderTransactionItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     initialNumToRender={10}
//                     maxToRenderPerBatch={10}
//                     windowSize={10}
//                     className="bg-white rounded-b-lg"
//                 />
//             ) : (
//                 <View className="py-8 items-center justify-center bg-white rounded-b-lg">
//                     <Feather name="inbox" size={40} color="gray" />
//                     <Text className="text-gray-500 mt-2">
//                         {searchQuery ? "No transactions found matching your search" : "No transactions available"}
//                     </Text>
//                 </View>
//             )}
//         </SafeAreaView>
//     );
// }




import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetAllNotification } from "@/api/hooks/notification/useGetAllNotifications";
import { useRouter } from "expo-router";

export default function TransactionHistory() {
    const router = useRouter();
    const { notification } = useGetAllNotification();
    const [selectedTab, setSelectedTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    // Initialize with notification data when available
    useEffect(() => {
        if (notification && notification.length > 0) {
            setFilteredTransactions(notification);
        }
    }, [notification]);

    // Handle search functionality
    const handleSearch = (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            // If search is empty, show all transactions based on selected tab
            filterByTab(selectedTab);
            return;
        }

        // Filter based on search text and selected tab
        let filtered = notification.filter(item => {
            const matchesSearch =
                (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
                (item.activity && item.activity.toLowerCase().includes(text.toLowerCase()));

            if (selectedTab === "All") return matchesSearch;
            if (selectedTab === "Sent") return matchesSearch && item.type === "debit";
            if (selectedTab === "Received") return matchesSearch && item.type === "credit";
            if (selectedTab === "Success") return matchesSearch && item.status === "Success";
            if (selectedTab === "Failed") return matchesSearch && item.status === "Failed";

            return matchesSearch;
        });

        setFilteredTransactions(filtered);
    };

    // Filter transactions based on selected tab
    const filterByTab = (tab) => {
        setSelectedTab(tab);

        if (!notification || notification.length === 0) return;

        let filtered;
        switch (tab) {
            case "Sent":
                filtered = notification.filter(item => item.action === "transfer");
                break;
            case "Received":
                filtered = notification.filter(item => item.action === "credit");
                break;
            case "Success":
                filtered = notification.filter(item => item.status === "Success");
                break;
            case "Failed":
                filtered = notification.filter(item => item.status === "Failed");
                break;
            default:
                filtered = notification;
        }

        // Apply search filter if there's an active search
        if (searchQuery.trim()) {
            filtered = filtered.filter(item =>
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.activity && item.activity.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredTransactions(filtered);
    };

    // Count transactions by type
    const sentCount = notification ? notification.filter(item => item.action === "transfer").length : 0;
    const receivedCount = notification ? notification.filter(item => item.action === "credit").length : 0;
    const successCount = notification ? notification.filter(item => item.status === "Success").length : 0;
    const failedCount = notification ? notification.filter(item => item.status === "Failed").length : 0;
    const totalCount = notification ? notification.length : 0;

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Render transaction item
    const renderTransactionItem = ({ item, index }) => (
        <View key={index} className="flex-row justify-between items-center border-b border-gray-200 py-3 px-4">
            <Text className="text-gray-600 text-sm">{formatDate(item.createdAt)}</Text>
            <Text>{item?.action || "Payment"}</Text>
            <View className={`px-2 py-1 rounded-lg border border-gray-300 flex-row gap-1 items-center`}>
                <Feather name="check-circle" size={14} color="green"/>
                <Text className="text-green-600 text-xs">Success</Text>
            </View>
            <Text className="text-gray-600 text-sm text-right">{item.name || item.activity}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            <ScrollView>
                {/* Header */}
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold ml-2">Transaction History</Text>
                </View>

                {/* Limits */}
                <Text className="mt-4 text-base font-semibold mb-4">Limits</Text>
                <View className="flex-row items-center mt-2">
                    <View className="bg-primary rounded-lg flex-1 h-14 items-center px-2 py-2">
                        <View className='bg-[#E6F8EE] h-full w-10 rounded-lg flex justify-center self-end'>
                            <Text className="text-xs font-medium text-center">80%</Text>
                        </View>
                    </View>
                    <View className="flex bg-gray-200 rounded-lg w-20 h-14 items-center ml-2 px-2 py-2">
                        <View className='bg-gray-500 h-full w-10 rounded-lg flex justify-center self-end'>
                            <Text className="text-xs font-medium text-white text-center">20%</Text>
                        </View>
                    </View>
                </View>

                {/* Daily limit */}
                <View className='flex-row items-center justify-between mt-4'>
                    <Text>Daily Limits</Text>
                    <Text className="text-gray-600 mt-2">₦8,000.00/ <Text className='text-gray-400'>₦10,000.00</Text></Text>
                </View>

                {/* Search */}
                <View className="border border-gray-200 rounded-xl flex-row items-center px-4 focus:outline-[#008080] focus:border-[#008080] h-16 mb-4" style={{marginTop:30}}>
                    <Ionicons name="search" size={20} color="gray" />
                    <TextInput
                        className="flex-1 ml-2 text-gray-700"
                        placeholder="Search transaction by name"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* Filter Tabs */}
                <View className='flex-row items-center justify-between border border-gray-200 p-10 px-4 rounded-lg py-3'>
                    <TouchableOpacity onPress={() => filterByTab("All")}>
                        <Text className={selectedTab === "All" ? "text-primary font-semibold" : ""}>All {totalCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByTab("Sent")}
                                      className={`flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md ${selectedTab === "Sent" ? "bg-primary" : ""}`}>
                        <Text className={selectedTab === "Sent" ? "text-white" : ""}>Sent {sentCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByTab("Received")}
                                      className={`flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md ${selectedTab === "Received" ? "bg-primary" : ""}`}>
                        <Text className={selectedTab === "Received" ? "text-white" : ""}>Received {receivedCount}</Text>
                    </TouchableOpacity>
                </View>

                {/* Transaction Header */}
                <View className="flex-row border-b border-gray-300 justify-between items-center rounded-lg px-4 py-4" style={{paddingVertical:10, marginBottom:10, marginTop: 16}}>
                    <Text className="font-semibold">Date</Text>
                    <Text className="font-semibold">Payment Method</Text>
                    <View className='flex-row gap-1'>
                        <Text className="font-semibold">Status</Text>
                        <View className='flex-col'>
                            <Feather name='chevron-up' size={10}/>
                            <Feather name='chevron-down' size={10}/>
                        </View>
                    </View>
                    <Text className="font-semibold">Activity</Text>
                    <View className='rounded-full bg-primary' style={{paddingHorizontal:8, paddingVertical:2}}>
                        <Text className='text-white'>{filteredTransactions.length}</Text>
                    </View>
                </View>

                {/* Transactions List */}
                {filteredTransactions && filteredTransactions.length > 0 ? (
                    <View className="shadow">
                        <FlatList
                            data={filteredTransactions}
                            renderItem={renderTransactionItem}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            scrollEnabled={false}
                        />
                    </View>
                ) : (
                    <View className="py-8 items-center justify-center bg-white rounded-lg shadow my-4">
                        <Feather name="inbox" size={40} color="gray" />
                        <Text className="text-gray-500 mt-2">
                            {searchQuery ? "No transactions found matching your search" : "No transactions available"}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}