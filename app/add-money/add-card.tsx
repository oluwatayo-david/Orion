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
import {generalSans} from "@/constants/Font";
import {CustomInput} from "@/components/Input";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function SignInScreen() {

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {Bold, SemiBold} = generalSans

    const router = useRouter();


    const onSubmit = async (data:any) => {
        try {
            const {email, password} = data;



console.log(data )

        } catch (e) {

        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView className="flex-1 bg-white pt-4">
                    {/* Header */}


                    <View className="flex-row items-center  ">
                        <Ionicons name="chevron-back" size={24} />
                        <Text className="text-lg font-semibold ml-2">Add Money With Card</Text>
                    </View>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View className="p-4 pt-3 flex flex-col gap-4" style={{paddingTop: 40}}>
                            <CustomInput
                                label="Card Number"
                                name="card_number"
                                control={control}
                                placeholder="**** **** **** **** 123"
                                secureTextEntry
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />

<View  className={'flex-row items-center justify-between gap-8'}>
    <View className={'flex-1'}>
    <CustomInput
        label="Expiry Date"
        name="expiry_date"
        control={control}
        placeholder="MM  |  YY "

        rules={{required: "This field is required"}}
        style={{fontFamily: generalSans.Light}}
    />
    </View>

    <View className={'flex-1'}>
    <CustomInput
        label="CVV"
        name="cvv"
        control={control}
        placeholder="Enter CVV"
        rules={{required: "This field is required"}}
        style={{fontFamily: generalSans.Light}}
    />
    </View>
</View>

                            <CustomInput
                                label="Card Pin"
                                name="card_pin"
                                control={control}
                                placeholder="****"
                                secureTextEntry
                                maxLength={4}
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />





                            <CustomInput
                                label="Amount"
                                name="amount"
                                control={control}
                                placeholder="100.00 - 9,000.00"
                                secureTextEntry
                                maxLength={4}
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />


                            <TouchableOpacity className={'bg-primary  w-full rounded-lg '} style={{paddingVertical:15}}>
                                <Text className={'text-center text-white  text-lg'}>Confirm Payment</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
