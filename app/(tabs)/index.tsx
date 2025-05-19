import {ScrollView, Image, StyleSheet, Platform, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Notification from "@/assets/svgs/notification";
import CoinIcon from "@/assets/svgs/coin";
import { Feather } from "@expo/vector-icons";
import OrionIcon from "@/assets/svgs/orionIcon";
import BankIcon from "@/assets/svgs/bankfill";
import Withdraw from "@/assets/svgs/withdraw";
import Add from "@/assets/svgs/add";
import Copy from "@/assets/svgs/copy";
import Credit from "@/assets/svgs/credit";
import Debit from "@/assets/svgs/debit";
import {useRouter} from "expo-router";
import {useAuth} from "@/api/hooks/useAuth";
import {useGetAllNotification} from "@/api/hooks/notification/useGetAllNotifications";
import DebitIcon from "@/assets/svgs/debit";
import CreditIcon from "@/assets/svgs/credit";

export default function HomeScreen() {
    const router = useRouter();
    const {user} = useAuth();
    const {notification} = useGetAllNotification();

    // Render item for transactions
    const renderTransactionItem = ({ item, index }) => (
        <View key={index} className={'flex-row justify-between items-center py-2'}>
            <View className={'flex-row gap-4 items-center'}>
                {
                    item.action==="transfer" ? <DebitIcon width={30} height={30}/> : <CreditIcon width={30} height={30} />
                }

                <Text> { item.action==="transfer" ? 'to' : 'from'} {item?.name} {item.action==="deposit" && 'Transfer'} </Text>
            </View>
            <Text className={'text-red-500'}>{item.amount}.00</Text>
        </View>
    );

    // Create a reversed copy of the notifications array for display
    const reversedNotifications = notification ? [...notification].reverse() : [];

    // Function to truncate analysis text to first 7 words
    const truncateAnalysis = (text) => {
        if (!text) return "";
        const words = text.split(" ");
        if (words.length <= 7) return text;
        return words.slice(0, 7).join(" ") + "...";
    };

    return (
        <ScrollView className={'bg-background px-4'} style={{ flex: 1 }}>
            <View className={'pt-12 flex-row gap-2 items-center justify-between'}>
                <View className={'flex-row gap-4 items-center'}>
                    <TouchableOpacity className={'bg-gray-500 p-5 rounded-full'} onPress={()=> router.push('/settings')}>
                        <Text className={'text-white text-center'}>{user?.name?.slice(0, 2).toUpperCase() || ''}{' '}</Text>
                    </TouchableOpacity>
                    <Text>Hi{' '} {user?.name}</Text>
                </View>
                <TouchableOpacity onPress={()=> router.push('/Notification')}>
                    <Notification width={40} height={40} />
                </TouchableOpacity>
            </View>

            {/* Card */}
            <View className={'bg-primary rounded-lg relative'} style={{ height: 140, marginTop: 20, borderRadius: 10, padding: 10, overflow: 'hidden' }}>
                <View className={'flex-row items-center justify-between'}>
                    <Text className={'text-white'}>Available Balance</Text>
                    <View className={'flex-row gap-2 items-center'}>
                        <TouchableOpacity onPress={()=> router.push('/Transaction-history')}><Text className={'text-white'}>Transaction history</Text></TouchableOpacity>
                        <Feather name={'chevron-right'} size={20} color={"white"} />
                    </View>
                </View>
                <View className={'flex-row gap-4 items-center'} style={{ marginTop: 30 }}>
                    <Text className={'text-3xl text-white'} style={{ fontSize: 25 }}>₦ {user?._wallet?.amount}</Text>
                    <Feather name={'eye'} size={20} color={"white"} />
                </View>
                <View className={'absolute'} style={{ bottom: -25, right: -10 }}>
                    <CoinIcon width={150} height={150} />
                </View>
            </View>

            {/* Services Card */}
            <View className={'flex-row items-center justify-between gap-4 px-4'} style={{ marginTop: 20 }}>
                {[
                    { icon: <OrionIcon width={30} height={30} />, text: "To Orion" , route:'/transfer'},
                    { icon: <BankIcon width={35} height={40} fill={'white'} />, text: "To Others" , route:'/transfer'},
                    { icon: <Withdraw width={32} height={27} fill={'white'} />, text: "Withdraw"  , route:'/ai'},
                    { icon: <Add width={35} height={27} fill={'white'} />, text: "Add Money"  ,route:'/add-money'}
                ].map((item, index) => (
                    <View key={index} className={'flex-col gap-2'}>
                        <TouchableOpacity onPress={()=> router.push(item?.route)}>
                            <View className={'p-4 shadow-md h-10 w-10 flex items-center justify-center rounded-lg bg-white'} style={{ elevation: 10 }}>
                                {item.icon}
                            </View>
                        </TouchableOpacity>
                        <Text className={'text-primary text-sm'}>{item.text}</Text>
                    </View>
                ))}
            </View>

            {/* Account Number */}
            <View className={'border border-gray-200 flex-row justify-between items-center px-4'}
                  style={{ height: 50, borderRadius: 10, width: '100%', marginTop: 20 }}>
                <View className={'flex-row gap-4 items-center'}>
                    <BankIcon width={35} height={35} strokeColor={'white'}/>
                    <Text className={'text-lg'}>{user?.name}</Text>
                </View>
                <View className={'flex-row gap-4 items-center'}>
                    <Text className={'text-lg'}>{user?.accountNumber}</Text>
                    <Copy width={25} height={25} />
                </View>
            </View>

            {/* Recent Transactions */}
            <View className={'flex-col'} style={{ marginTop: 30, gap: 15 }}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className={'text-start'}>Recent Transactions</Text>
                    {notification && notification.length > 2 && (
                        <TouchableOpacity onPress={() => router.push('/Notification')}>
                            <Text style={{ color: '#008080' }}>See all</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Using FlatList for notifications */}
                {notification && notification.length > 0 ? (
                    <FlatList
                        data={reversedNotifications.slice(0, 2)}
                        renderItem={renderTransactionItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />
                ) : (
                    <Text>No recent transactions</Text>
                )}
            </View>

            {/* AI Summary */}
            <View className={' flex-row items-center justify-between mb-4'} style={{ marginTop: 20 }}>
                <Text>AI Summary</Text>
                <TouchableOpacity onPress={()=>{router.push('/ai')}}>
                    <Text style={{ color: '#008080' }}>See more...</Text>
                </TouchableOpacity>
            </View>

            <View className={'rounded-xl min-h-56 border border-gray-300 bg-white '} style={{
                paddingHorizontal: 20,
                paddingVertical: 30,
                marginBottom:40
            }} >
                <View className={'flex-row gap-4 items-center justify-between'}>
                    <View className={'flex-col gap-2'}>
                        <View className={'flex-row gap-2 items-center self-start'}>
                            <Debit width={30} height={30} />
                            <Text>Money Out</Text>
                        </View>
                        <Text>₦ 6,000,000</Text>
                    </View>

                    <View className={'flex-col gap-2 items-center'}>
                        <View className={'flex-row gap-2 items-center self-start'}>
                            <Credit width={30} height={30} />
                            <Text>Money In</Text>
                        </View>
                        <Text>₦ {user?._wallet?.inflow}</Text>
                    </View>
                </View>

                {[
                    { icon: <OrionIcon width={30} height={30} />, text: truncateAnalysis(user?.lastAnalysis) },
                ].map((item, index) => (
                    <View key={index} className={'flex-row items-center gap-4 py-2'} style={{ marginTop: 10 }}>
                        {item.icon}
                        <Text className={'text-sm text-wrap'}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        minHeight: 20,
    },
});