import {ScrollView, Image, StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
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
export default function HomeScreen() {
    const router = useRouter();
    return (
        <ScrollView className={'bg-background px-4'} style={{ flex: 1 }}>
            <View className={'pt-12 flex-row gap-2 items-center justify-between'}>
                <View className={'flex-row gap-4 items-center'}>
                    <TouchableOpacity className={'bg-gray-500 p-5 rounded-full'} onPress={()=> router.push('/settings')}>
                        <Text className={'text-white text-center'}>DA</Text>
                    </TouchableOpacity>
                    <Text>Hi David</Text>
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
                        <TouchableOpacity  onPress={()=> router.push('/Transaction-history')}><Text className={'text-white'}>Transaction history</Text></TouchableOpacity>
                        <Feather name={'chevron-right'} size={20} color={"white"} />
                    </View>
                </View>
                <View className={'flex-row gap-4 items-center'} style={{ marginTop: 30 }}>
                    <Text className={'text-3xl text-white'} style={{ fontSize: 25 }}>₦ 500,000.00</Text>
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
                        <View className={'p-4  shadow-md h-10 w-10 flex items-center justify-center rounded-lg bg-white'} style={{ elevation: 10 }}>
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
                    <BankIcon width={35} height={35}   strokeColor={'white'}/>
                    <Text className={'text-lg'}>David</Text>
                </View>
                <View className={'flex-row gap-4 items-center'}>
                    <Text className={'text-lg'}>9030213152</Text>
                    <Copy width={25} height={25} />
                </View>
            </View>

            {/* Recent Transactions */}
            <View className={'flex-col'} style={{ marginTop: 30, gap: 15 }}>
                <TouchableOpacity >
                <Text className={'text-start'} style={{ marginBottom: 20 }}>Recent Transactions</Text>
                </TouchableOpacity>
                {[
                    { icon: <Credit width={30} height={30} />, text: "to Chkwuemeka Emmanu...", amount: "₦ 200,000.00", color: "#008080" },
                    { icon: <Debit width={30} height={30} />, text: "to Chkwuemeka Emmanu...", amount: "₦ 200,000.00", color: "red" }
                ].map((item, index) => (
                    <View key={index} className={'flex-row justify-between items-center'}>
                        <View className={'flex-row gap-4 items-center'}>
                            {item.icon}
                            <Text>{item.text}</Text>
                        </View>
                        <Text style={{ color: item.color }}>{item.amount}</Text>
                    </View>
                ))}
            </View>

            {/* AI Summary */}
            <View className={' flex-row items-center justify-between mb-4'} style={{ marginTop: 20 }}>
                <Text>AI Summary</Text>
                <TouchableOpacity onPress={()=>{router.push('/ai')}}>
                <Text style={{ color: '#008080' }}>See more...</Text>
                </TouchableOpacity>
            </View>

            <View className={'rounded-xl  min-h-56 border border-gray-300 bg-white '} style={{
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
                        <Text>₦ 6,000,000</Text>
                    </View>
                </View>

                {[
                    { icon: <OrionIcon width={30} height={30} />, text: "In the past 3 months, you’ve spent more money on betting. Would you like to cut down on it?" },
                    { icon: <OrionIcon width={30} height={30} />, text: "Consider saving more to meet your ." }
                ].map((item, index) => (
                    <View key={index} className={'flex-row items-center gap-4 border-b border-b-gray-200 py-2'} style={{ marginTop: 10 }}>
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
