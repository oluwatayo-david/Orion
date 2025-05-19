import React, {useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {generalSans} from "@/constants/Font";
import {CustomInput} from "@/components/Input";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Loader from "@/components/ui/Loader";
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateWalletDeposit} from "@/api/features/auth/authSlice";

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit} = useForm({
        defaultValues: {
            card_number: "",
            expiry_date: "",
            cvv: "",
            card_pin: "",
            amount: "",
        },
    });
    const {Bold, SemiBold} = generalSans;
    const router = useRouter();
    const dispatch = useDispatch();

    const showSuccessToast = () => {
        Alert.alert(
            "Success",
            "Money deposited successfully!",
            [
                {
                    text: "OK",
                    onPress: () => router.replace("/(tabs)")
                }
            ]
        );
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Extract the amount from form data
            const amount = data.amount.replace(/[^0-9]/g, '');

            // Make the API call to simulate deposit
            const response = await axios.post('http://192.168.137.1:3000/bank/simulate-deposit', {
                amount: amount
            });

            // Handle success
            console.log('Deposit response:', response.data);

            // Update the wallet in Redux state
            dispatch(updateWalletDeposit(response.data));

            setLoading(false);
            showSuccessToast();

        } catch (error) {
            setLoading(false);
            console.error('Deposit error:', error);
            Alert.alert(
                "Error",
                "Failed to deposit money. Please try again.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView className="flex-1 bg-white pt-4">
                    {/* Loading Indicator */}
                    <Loader loading={loading} />

                    {/* Header */}
                    <View className="flex-row items-center px-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} />
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold ml-2">Add Money With Card</Text>
                    </View>

                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View className="p-4 pt-3 flex flex-col gap-4" style={{paddingTop: 40}}>
                            <CustomInput
                                label="Card Number"
                                name="card_number"
                                control={control}
                                placeholder="**** **** **** **** 123"
                                keyboardType="numeric"
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />

                            <View className={'flex-row items-center justify-between gap-8'}>
                                <View className={'flex-1'}>
                                    <CustomInput
                                        label="Expiry Date"
                                        name="expiry_date"
                                        control={control}
                                        placeholder="MM  |  YY"
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
                                        keyboardType="numeric"
                                        maxLength={3}
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
                                keyboardType="numeric"
                                maxLength={4}
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />

                            <CustomInput
                                label="Amount"
                                name="amount"
                                control={control}
                                placeholder="100.00 - 9,000.00"
                                keyboardType="numeric"
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                            />

                            <TouchableOpacity
                                className={'bg-primary w-full rounded-lg mt-4'}
                                style={{paddingVertical:15}}
                                onPress={handleSubmit(onSubmit)}
                                disabled={loading}
                            >
                                <Text className={'text-center text-white text-lg'}>
                                    {loading ? "Processing..." : "Confirm Payment"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}