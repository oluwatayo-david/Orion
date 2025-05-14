import React, {useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {generalSans} from "../../../ORION/constants/Font";
import {CustomInput} from "@/components/Input";
import BiometricsSvg from "@/assets/svgs/Biometrics";
import {useRouter} from "expo-router";
import {toast} from "sonner-native";

import * as LocalAuthentication from "expo-local-authentication";
import OrionLogo from "@/assets/svgs/orionLogo";
import HeroIcon from "@/assets/svgs/HeroIcon";

export default function SignUpScreen() {
    const [biomertricLoading, seBiometricLoading] = useState(false)
    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

  const   token = true
    const {Bold, SemiBold} = generalSans
    const router = useRouter();



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView className="flex-1 bg-white">
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View className="p-4 pt-3 flex flex-col" style={{paddingTop: 10}}>
                            <View className={' self-center  '}>
                                <OrionLogo height={100} width={100} />



                            </View>


                            <View className={'flex items-center justify-center  relative  w-full'} style={{ height:300  , overflow:"hidden" , marginBottom:20}}>
                                <HeroIcon width={337} height={340} style={{display:'absolute' , bottom:-100}}/>
                            </View>


                            <Text  className={'text-2xl text-center font-bold'}>
                                Step Up Your Finance
                            </Text>

                            <Text  className={'text-lg text-center '}>
                                Maximize Your Finance with Our Special AI
                            </Text>


                            <View className={'flex-col gap-8 '} style={{marginTop: 90}}>
                                <TouchableOpacity className={'bg-primary  py-4 px-3 rounded-lg'} style={{marginHorizontal: 20}} onPress={()=> router.push('/sign-in')}>
<Text className={'text-white text-lg text-center'}>Login</Text>
                                </TouchableOpacity>


                                <TouchableOpacity className={'border border-primary  py-4 px-3 rounded-lg'} style={{marginHorizontal: 20}} onPress={()=> router.push('/sign-up')}>
                                    <Text className={'text-primary text-lg  text-center '}>Sign up</Text>
                                </TouchableOpacity>
                            </View>

                                                   </View>


                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
