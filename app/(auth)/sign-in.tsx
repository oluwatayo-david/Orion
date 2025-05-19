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
import {useAuth} from "@/api/hooks/useAuth";
import Loader from "@/components/ui/Loader";
export default function SignInScreen() {
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
    const [loading , setLoading] = useState(false)
 const { login} = useAuth()
    const handleBiometricAuth = async () => {
        try {

            if (!token) {
                toast.error("No user found for biometric authentication.");
                return;
            }

            // Check for biometric hardware and enrollment
            const isHardwareAvailable = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isHardwareAvailable || !isEnrolled) {
                toast.error("Biometric authentication not available.");
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Biometrics",
                fallbackLabel: "Use Passcode",
            });

            seBiometricLoading(true)


            if (result.success) {

                toast.success("Login successful!");
                router.replace("/(tabs)");
            } else {
                toast.info("You are logged out login to use biometrics");
            }
        } catch (err) {
            toast.error("An error occurred during biometric authentication.");
        } finally {
            seBiometricLoading(false)
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const {email, password} = data;
            console.log(email , password)
            setLoading(true)
            await  login({email , password})
            toast.success("Login successful!");
            router.replace("/(tabs)");

            console.log("Token from mmkv:", token);
        } catch (e:any) {
            toast.error(e.message || "An error occurred during login.");
        }finally {
            setLoading(false)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView className="flex-1 bg-white">
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View className="p-4 pt-3 flex flex-col" style={{paddingTop: 70}}>
                            <OrionLogo height={80} width={80} style={{marginBottom: 10}}/>
                            <View className="py-10">
                                <Text className="text-4xl mb-2 text-[#008080]" style={{fontFamily: generalSans.Bold}}>
                                    Welcome Back
                                </Text>
                                <Text className="text-gray-600" style={{fontFamily: generalSans.Regular}}>
                                    Login to your account
                                </Text>
                            </View>

                            <CustomInput
                                label="Email Address or Phone Number"
                                name="email"
                                style={{fontFamily: generalSans.Light}}

                                control={control}
                                placeholder="Email address or phone number"
                                rules={{
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                }}
                            />

                            <CustomInput
                                label="Password"
                                name="password"
                                control={control}
                                placeholder="Enter your password"
                                secureTextEntry
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />





                            <View className="mt-8 flex-row gap-2 justify-center items-center mb-32 w-full">


                                <TouchableOpacity className={' bg-primary py-4   rounded-lg  flex-1 '} onPress={handleSubmit(onSubmit)}>
                                    <Text className={'text-white text-center text-lg'}>Login</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="border border-[#008080] rounded-lg px-6"
                                    onPress={handleBiometricAuth}
                                    style={{paddingVertical: 9}}
                                    disabled={!token}
                                >
                                    <BiometricsSvg width={30} height={30} fill={'transparent'}/>
                                </TouchableOpacity>

                            </View>

                            <View className="flex-row justify-center items-center">
                                <Text className="text-gray-700" style={{fontFamily: generalSans.Light}}>
                                    Don't have an account?{" "}
                                </Text>

                                <TouchableOpacity onPress={()=> router.push('/(auth)/sign-in')}>
                                    <Text className={'text-primary font-bold text-lg'}>Sign up</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

<Loader loading={loading}/>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
