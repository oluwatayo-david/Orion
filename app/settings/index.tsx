import React, {useState , useRef} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions, Animated, FlatList

} from "react-native";
import {Switch} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {generalSans} from "@/constants/Font";
import {CustomInput} from "@/components/Input";
import {useRouter} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";
import OrionIcon from "@/assets/svgs/orionIcon";
import items from "ajv/lib/vocabularies/applicator/items";
import Empty from "@/assets/svgs/Empty";
import Customercare from "@/assets/svgs/customercare";
import Theme from "@/assets/svgs/theme";
import Setting from "@/assets/svgs/setting";
import LogOut from "@/assets/svgs/log-out";

export default function SettingsScreen() {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    return (

                <SafeAreaView className="flex-1 bg-background pt-4">
                    {/* Header */}


                    <View className="flex-row items-center  ">
                        <Ionicons name="chevron-back" size={24} />
                        <Text className="text-lg font-semibold ml-2">Profile Details</Text>
                    </View>

                    <ScrollView>
 <View className={'bg-gray-500 p-8 rounded-full flex self-center  relative'} >
<Text className={'text-white text-center'}>DA</Text>
     <Feather name={'camera'} color={'green'} size={20} className={'absolute '}  style={{bottom: 0 , right:-9}}/>
                    </View>
                        
                        
                        <View className={'flex self-center  items-center justify-center  mt-8'}>
                            <Text className={'text-lg font-bold'} >David Oluwatayo</Text>
                        </View>



                        {/*account information*/}

                        <View className={'w-full mt-8 px-4'}>
                            <Text className={'text-start text-md'}>Account Information </Text>

                            <View className={'flex-col gap-4 border border-gray-300 p-4 rounded-lg'}>
                                <View className={'flex-row items-center justify-between'}>
                             <Text className={'font-bold'}>Account Name </Text>
                                    <Text>David Oluwatayo</Text>

                                </View>

                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Orion Account Number </Text>
                                    <Text>1235783912</Text>

                                </View>


                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Date of Account Creation </Text>
                                    <Text>23/01/25</Text>

                                </View>


                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>BVN </Text>
                                    <Text>*** *** **34</Text>

                                </View>


                            </View>
                        </View>



                        {/*personal information*/}


                        <View className={'w-full mt-8 px-4'}>
                            <Text className={'text-start text-md'}>Personal Information </Text>

                            <View className={'flex-col gap-4 border border-gray-300 p-4 rounded-lg'}>
                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Full Name </Text>
                                    <Text>David Oluwatayo</Text>

                                </View>

                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Username</Text>
                                    <Text>CyberspaceX</Text>

                                </View>


                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Email</Text>
                                    <Text>Oluwatayodavid273@gmail.com</Text>

                                </View>


                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Gender </Text>
                                    <Text>Male</Text>

                                </View>


                                <View className={'flex-row items-center justify-between'}>
                                    <Text className={'font-bold'}>Date of Birth </Text>
                                    <Text>May 15, 2000</Text>

                                </View>


                            </View>
                        </View>




                        {/*Actions*/}



                        <View className={'w-full mt-8 px-4 '} style={{paddingBottom:50}}>
                            <Text className={'text-start text-md'}>Actions </Text>

                            <View className={'flex-col gap-4 border border-gray-300 p-4 rounded-lg'}>

<View className={'flex-row items-center justify-between border border-gray-300 rounded-lg'} style={{padding:7}}>
<View className={'flex-row items-center gap-4  '} >
<OrionIcon width={30} height={30}/>
    <Text>AI Notification</Text>
</View>

    <Switch value={isSwitchOn} onValueChange={onToggleSwitch}   color={'#008080'}/>
</View>




                                <View className={'flex-row items-center justify-between border border-gray-300 rounded-lg'} style={{padding:7}}>
                                    <View className={'flex-row items-center gap-4  '} >
                                      <Customercare width={36} height={36}/>
                                        <Text>Customer Support</Text>
                                    </View>

<Feather name={'chevron-right'}  size={20}/>
</View>




                                <View className={'flex-row items-center justify-between border border-gray-300 rounded-lg'} style={{padding:7}}>
                                    <View className={'flex-row items-center gap-4  '} >
                                        <Theme width={36} height={36}/>
                                        <Text>Theme</Text>
                                    </View>

                                    <Feather name={'chevron-right'}  size={20}/>
                                </View>



                                <View className={'flex-row items-center justify-between border border-gray-300 rounded-lg'} style={{padding:7}}>
                                    <View className={'flex-row items-center gap-4  '} >
                                        <Setting width={36} height={36}/>
                                        <Text>Settings</Text>
                                    </View>

                                    <Feather name={'chevron-right'}  size={20}/>
                                </View>

                            </View>

                            {/*log out */}

                            <View className={'flex-row items-center justify-between border border-gray-300 rounded-lg bg-[#FF3B30]'} style={{padding:7 , marginTop:30}}>
                                <View className={'flex-row items-center gap-4  '} >
                                    <LogOut width={36} height={36}/>
                                    <Text className={'text-white'}>Log out</Text>
                                </View>

                                <Feather name={'chevron-right'}  size={20} color={'white'}/>
                            </View>
                        </View>



                    </ScrollView>

                </SafeAreaView>

    );
}
