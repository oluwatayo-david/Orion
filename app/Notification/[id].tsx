import {View, Text, TextInput, ScrollView, TouchableOpacity, Button} from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import Copy from "@/assets/svgs/copy";




export default function TransactonDetails() {
    const [selectedTab, setSelectedTab] = useState("All");

    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}

            <View className={'flex-row justify-between items-center'}>
                <View className="flex-row items-center">
                    <Ionicons name="chevron-back" size={24} />
                    <Text className="text-lg font-semibold ml-2">Notifications</Text>
                </View>




            </View>



            {/*details*/}
<View className={'mt-8 flex-col '}>
            <Text className={'text-center text-md'}>Amount Sent</Text>
   <Text className={'text-center text-3xl'}>1,000.00</Text>
</View>

            <View className={' mt-6 w-1/2 px-6 py-2 border border-gray-200 flex-row gap-2 rounded-lg items-center justify-center self-center'}>
                <Feather name={'check-circle'} color={'#008080'} size={20}/>
                <Text className={'text-md text-primary'}>Transfer Successful!</Text>
            </View>


            <View className={' bg-white flex-row gap-3  border border-gray-200  rounded-lg p-4 mt-4 items-center ' }>
<View className={'flex-col  gap-1 items-center'}>
    <Feather name={'check-circle'} color={'#008080'} size={20}/>
    <View style={{ height: 120, width: 3, backgroundColor: '#008080' }}></View>
    <Feather name={'check-circle'} color={'#008080'} size={20}/>

</View>
                <View className={'flex-col flex-1'}>
                   <View className={'flex-row justify-between items-start border-b border-b-gray-200 '}>
                       <View className={'flex-col gap-3 justify-start'}>
                           <Text>FROM</Text>
                           <Text>John Doe Emmanuel</Text>
                           <Text>orion-**** ** 45</Text>
                       </View>
                       <View className={'flex-col gap-3 justify-start'}>
                           <Text>Jan 10, 2025</Text>
                           <Text>3:15pm</Text>
                       </View>
                   </View>

                    <View className={'flex-row justify-between mt-2'}>
                        <View className={'flex-col gap-3 '}>
                            <Text>To</Text>
                            <Text>John Doe Emmanuel</Text>
                            <Text>orion-**** ** 45</Text>
                        </View>
                        <View className={'flex-col gap-3 '}>
                            <Text>Jan 10, 2025</Text>
                            <Text>3:15pm</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View className={'my-6'}>
              <Text>Transfer Details</Text>
            </View>

 <View className={'border border-gray-200 rounded-lg py-2 px-4 bg-white'}>
     <View className={'flex-row items-center justify-between border-b border-b-gray-200 py-4'}>
         <Text>Transfer ID</Text>
         <View className={'flex-row items-center justify-between gap-2'}>
             <Text>#9030213152</Text>
             <Copy width={20} height={20}/>
         </View>


     </View>

     <View className={'flex-row items-center justify-between border-b border-b-gray-200 py-4'}>
         <Text>Amount Sent</Text>
         <View className={'flex-row items-center justify-between gap-2'}>
             <Text>1,000.00</Text>
         </View>


     </View>


     <View className={'flex-row items-center justify-between py-4'}>
         <Text>Transaction Fee</Text>
         <View className={'flex-row items-center justify-between gap-2'}>
             <Text>0.00</Text>
         </View>


     </View>

 </View>

            <View className={'mt-6'}>
                <Text>Remark</Text>
                <View style={{ paddingBottom:10  , paddingTop:5}}>

                    <TextInput
                        placeholder="Enter your remark..."
                        multiline={true}
                        numberOfLines={4}
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            textAlignVertical: "top",
                            height: 100,
                        }}
                        className={'py-2 px-4'}
                    />
                </View>
            </View>


            <View className={'flex-row gap-2 items-center mt-8' } style={{marginBottom:70}}>
                <TouchableOpacity className={'flex-1 border border-[#008080] flex-row items-center gap-2  py-3 px-4 rounded-lg justify-center'}>
                <Feather name={'download'}  color={'#008080'} size={15}/>
                <Text className={'text-primary'}>Download Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity className={'flex-1 bg-primary flex-row items-center gap-2  py-3 px-4 rounded-lg justify-center'}>
                    <Feather name={'upload'}  color={'white'} size={15}/>
                    <Text className={'text-white'}>share Receipt</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
