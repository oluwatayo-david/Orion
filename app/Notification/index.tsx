import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import {useRouter} from "expo-router";



export default function Notification() {
    const [selectedTab, setSelectedTab] = useState("All");
const router = useRouter()
    return (
        <SafeAreaView className="flex-1 bg-white px-4 pt-4">
            {/* Header */}

            <View className={'flex-row justify-between items-center'}>
            <View className="flex-row items-center">
                <Ionicons name="chevron-back" size={24} />
                <Text className="text-lg font-semibold ml-2">Notifications</Text>
            </View>

                <View className="flex-row items-center">
                    <Text className="text-lg font-semibold ml-2 text-primary">Clear</Text>
                    <Feather name="x" size={24} color={'#008080'} />

                </View>


            </View>


            {/*Unread messages*/}
            <View>
                <View className={'my-6'}>
                <Text>
                    Unread Notifications
                </Text>
                </View>
                <TouchableOpacity className={' bg-primary px-2 py-3 flex-row  gap-2 rounded-lg  '} onPress={()=> router.push('/Notification/[id]')}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center  '}>
                        <OrionIcon width={30} height={30}/>
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </TouchableOpacity>

                <View className={'h-20 w-full bg-[#FF3B30] px-2 py-3 flex-row gap-2 mt-10 rounded-lg'}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center '}>
                        <OrionIcon width={30} height={30} fill={'#FF3B30'} />
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </View>

                <View className={'h-20 w-full bg-primary px-2 py-3 flex-row gap-2 mt-10 rounded-lg'}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center '}>
                        <OrionIcon width={30} height={30}/>
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </View>






                <View className={'my-6'}>
                    <Text>
                        Read Notifications
                    </Text>
                </View>
                <View className={'h-20 w-full bg-[#8FBDBD] px-2 py-3 flex-row gap-2 rounded-lg'}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center '}>
                        <OrionIcon width={30} height={30}/>
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </View>

                <View className={'h-20 w-full bg-[#EDC7C5] px-2 py-3 flex-row gap-2 mt-10 rounded-lg'}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center '}>
                        <OrionIcon width={30} height={30} fill={'#FF3B30'} />
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </View>

                <View className={'h-20 w-full bg-[#8FBDBD] px-2 py-3 flex-row gap-2 mt-10 rounded-lg'}>
                    <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center '}>
                        <OrionIcon width={30} height={30}/>
                    </View>
                    <View className={'flex-1 flex-col'}>
                        <Text className={'text-white font-semibold'} numberOfLines={1} ellipsizeMode="tail">
                            Transfer was successful
                        </Text>
                        <Text className={'text-white flex-wrap'}>
                            The transfer of 2,000 to CHKWUEMEKA , *** *** ***17 was successful.
                        </Text>
                    </View>

                </View>


            </View>


        </SafeAreaView>
    );
}
