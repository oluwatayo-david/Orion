import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";



const tabs = ["All", "Sent", "Received"];
const transactions = [
    { date: "Jan 15, 2025", method: "Card", status: "Success", activity: "To Orion POS", success: true },
    { date: "Jan 15, 2025", method: "App", status: "Success", activity: "To Jane Doe", success: true },
    { date: "Jan 15, 2025", method: "Card", status: "Failed", activity: "To Ile POS", success: false },
    { date: "Jan 15, 2025", method: "App", status: "Success", activity: "To Jane Doe", success: true },
    { date: "Jan 15, 2025", method: "Card", status: "Failed", activity: "To Jane Doe", success: false },
];

export default function TransactionHistory() {
    const [selectedTab, setSelectedTab] = useState("All");

    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            <ScrollView>
            {/* Header */}
            <View className="flex-row items-center">
                <Ionicons name="chevron-back" size={24} />
                <Text className="text-lg font-semibold ml-2">Transaction History</Text>
            </View>

            {/* Limits */}
            <Text className="mt-4 text-base font-semibold mb-4">Limits</Text>
            <View className="flex-row items-center mt-2 ">
                <View className=" bg-primary rounded-lg flex-1 h-14 items-center px-2 py-2">
                    <View className={' bg-[#E6F8EE] h-full w-10 rounded-lg flex justify-center self-end'} >
                        <Text className=" text-xs font-medium  text-center">80%</Text>

                    </View>
                </View>
                <View className="flex bg-gray-200 rounded-lg w-20  h-14 items-center ml-2 px-2 py-2">
                    <View className={' bg-gray-500 h-full w-10 rounded-lg flex justify-center self-end'} >
                        <Text className=" text-xs font-medium  text-white text-center">20%</Text>

                    </View>
                </View>
            </View>

            {/*daily limit*/}
<View className={'flex-row items-center justify-between mt-4'}>
    <Text>Daily Limits</Text>
    <Text className="text-gray-600 mt-2"> ₦8,000.00/ <Text className={'text-gray-400 '}>₦10,000.00</Text></Text>

</View>

            {/* Search */}
            <View className="border border-gray-200 rounded-xl flex-row items-center  px-4 focus:outline-[#008080]  focus:border-[#008080] h-16 mb-4" style={{marginTop:30}}>
                <Ionicons name="search" size={20} color="gray" />
                <TextInput className="flex-1 ml-2 text-gray-700" placeholder="Search transaction by name" />
            </View>

            {/* Tabs */}


                <View className={'flex-row items-center justify-between   border border-gray-200 p-10 px-4 rounded-lg  py-3'} >
                    <Text>All 35</Text>
                    <View className={'flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md '}>
                        <Text>sent 20</Text>

                    </View>

                    <View className={'flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md '}>
                        <Text>Received 20</Text>

                    </View>
                </View>

            {/* Transactions */}

                <View className="flex-row border-b border-gray-300  justify-between items-center rounded-lg px-4  py-4 " style={{paddingVertical:10, marginBottom:10}}>
                    <Text className="font-semibold">Date </Text>
                    <Text className="font-semibold">Payment Method</Text>
                    <View className={'flex-row gap-1'}>
                        <Text className="font-semibold">Status</Text>
<View className={'flex-col'}>
    <Feather name={'chevron-up'} size={10}/>
    <Feather name={'chevron-down'} size={10}/>

</View>
                    </View>
                    <Text className="font-semibold">Activity</Text>
<View className={'rounded-full bg-primary  '} style={{paddingHorizontal:8 , paddingVertical:2}}>
<Text className={'text-white'}>2</Text>
</View>

                </View>
<View className={'shadow'} >

                {transactions.map((item, index) => (
                    <View key={index} className="flex-row justify-between items-center border-b border-gray-200 py-2 px-4 ">
                        <Text className="text-gray-60 text-sm text-start">{item.date}</Text>
                        <Text className="text-gray-600 ">{item.method}</Text>
                        <View className={`px-2 py-1 rounded-lg border border-gray-300 flex-row gap-2 items-center`}>
                            {item.success ? <Feather name={'check-circle'} color={'green'}/> :  <Feather name={'info'} color={'red'}/> }
                            <Text className={item.success ? "text-green-600" : "text-red-600"}>{item.status}</Text>
                        </View>
                        <Text className="text-gray-600">{item.activity}</Text>
                    </View>
                ))}


</View>
            </ScrollView>
        </SafeAreaView>
    );
}
