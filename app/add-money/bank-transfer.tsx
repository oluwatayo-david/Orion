import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import {useRouter} from "expo-router";
import Copy from "@/assets/svgs/copy";



export default function BankTransferScreen() {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            {/* Header */}


            <View className="flex-row items-center ">
                <Ionicons name="chevron-back" size={24} />
                <Text className="text-lg font-semibold ml-2">Bank Transfer</Text>
            </View>

            <View  className={'mt-4  flex-col bg-white'} style={{gap:30}}>
              <View className={'border border-gray-200 rounded-lg flex-col gap-8  p-4 min-h-[100px]'} style={{gap:30}}>
                  <View className={'flex-row gap-2'}>
                      <View className={'rounded-lg border border-gray-200 items-center justify-center p-4'} style={{padding:20 }}>
                          <Text className={'text-primary'}>568</Text>
                      </View>

                      <View className={'flex-col gap-2 '}>
                          <Text className={'text-md'}>Ile Account Number</Text>
                          <Text className={'text-3xl text-bold'}>224 567 1234</Text>
                      </View>
                  </View>


                  {/*for bank*/}
                  <View className={'flex-row gap-2'}>
                      <View className={'rounded-lg border border-gray-200 items-center justify-center '} style={{padding:12 }}>
<OrionIcon width={40} height={40}/>
            </View>

                      <View className={'flex-col gap-2 '}>
                          <Text className={'text-md'}>Bank</Text>
                          <Text className={'text-lg text-bold'}>Orion Banking Services</Text>
                      </View>
                  </View>

                  {/*for bank*/}
                  <View className={'flex-row gap-2'}>
                      <View className={'rounded-lg border border-gray-200 items-center justify-center '} style={{padding:14 }}>
                          <Feather name={'user'} size={35} color={'#008080'}/>
                      </View>

                      <View className={'flex-col gap-2 '}>
                          <Text className={'text-md'}>Account Name</Text>
                          <Text className={'text-lg text-bold'}>John Doe Emmanuel</Text>
                      </View>
                  </View>

              </View>




<View className={'flex-row justify-center items-center  gap-8 '} style={{gap:30}}>
    <TouchableOpacity className={'flex-row  gap-2 justify-center items-center flex-1 border  border-[#008080] py-3 px-4 rounded-lg'}>
        <Copy width={20} height={20} fill={'#008080'} />
        <Text className={'text-primary'}>Copy Details</Text>
    </TouchableOpacity>


    <TouchableOpacity className={'flex-row  gap-2 justify-center items-center flex-1 border  border-[#008080] py-3 px-4 rounded-lg bg-primary'}>
<Feather name={'upload'} size={20} color={'white'}/>
        <Text className={'text-white'}>Share Details</Text>
    </TouchableOpacity>
</View>


            </View>






        </SafeAreaView>
    );
}
