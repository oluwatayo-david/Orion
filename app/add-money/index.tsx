import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import {useRouter} from "expo-router";



export default function AddMoneyScreen() {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            {/* Header */}


                <View className="flex-row items-center">
                    <Ionicons name="chevron-back" size={24} />
                    <Text className="text-lg font-semibold ml-2">Add money</Text>
                </View>

<View  className={'mt-4  flex-col '} style={{gap:30}}>
    <TouchableOpacity className={' border border-gray-200 px-2 py-4 flex-row  gap-2 rounded-lg  bg-white  items-start '} onPress={()=> router.push('/add-money/bank-transfer')}>
        <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center  self-center '}>
            <OrionIcon width={50} height={50}/>
        </View>
        <View className={'flex-1 flex-col '}>
            <Text className={' font-semibold text-2xl'} numberOfLines={1} ellipsizeMode="tail">
              Bank  Transfer
            </Text>
            <Text >
                Add money by using copying or sharing  your
                account number/details.
            </Text>
        </View>
 <Feather name={'chevron-right'} size={25}  />
    </TouchableOpacity>




    <TouchableOpacity className={' border border-gray-200 px-2 py-4 flex-row  gap-2 rounded-lg  bg-white  items-start'} onPress={()=> router.push('/add-money/add-card')}>
        <View className={'bg-white rounded-lg py-2 px-2 flex justify-center items-center self-center '}>
            <OrionIcon width={50} height={50}/>
        </View>
        <View className={'flex-1 flex-col '}>
            <Text className={' font-semibold text-2xl'} numberOfLines={1} ellipsizeMode="tail">
                Add money with card
            </Text>
            <Text>
                Add money by using copying or sharing  your
                account number/details.
            </Text>
        </View>
        <Feather name={'chevron-right'} size={25}  />
    </TouchableOpacity>
</View>






        </SafeAreaView>
    );
}
