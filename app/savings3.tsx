import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";

export default function SavingsSummaryScreen({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-4 py-3 border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
                    <AntDesign name="left" size={24} color="#000" />
                    <Text className="text-lg font-bold ml-1">Saving</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5">
                {/* Instructions */}
                <Text className="text-base text-gray-500 mt-5 mb-5">
                    Setup your flexible saving plans, please review the information provided.
                </Text>

                {/* Progress Bar */}
                <View className="flex-row mb-6">
                    <View className="flex-1 h-1 bg-gray-200 rounded mr-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded mr-1" />
                    <View className="flex-1 h-1 bg-teal-700 rounded" />
                </View>

                {/* Summary Section */}
                <Text className="text-lg font-bold mb-4">Summary</Text>

                <View className="border border-dashed border-teal-700 rounded-lg mb-6 overflow-hidden">
                    {/* Summary Items - Saving Duration */}
                    <View className="flex-row border-b border-gray-200">
                        <View className="flex-1 py-4 px-5">
                            <Text className="text-base font-medium text-gray-800">Saving Duration</Text>
                        </View>
                        <View className="flex-1 py-4 px-5 bg-gray-50">
                            <Text className="text-base font-medium text-teal-700 text-right">44 days</Text>
                        </View>
                    </View>

                    {/* Summary Items - Interest Rate */}
                    <View className="flex-row border-b border-gray-200">
                        <View className="flex-1 py-4 px-5">
                            <Text className="text-base font-medium text-gray-800">Interest Rate</Text>
                        </View>
                        <View className="flex-1 py-4 px-5 bg-gray-50">
                            <Text className="text-base font-medium text-teal-700 text-right">9%.p.a</Text>
                        </View>
                    </View>

                    {/* Summary Items - Tax Rate */}
                    <View className="flex-row border-b border-gray-200">
                        <View className="flex-1 py-4 px-5">
                            <Text className="text-base font-medium text-gray-800">Tax Rate</Text>
                        </View>
                        <View className="flex-1 py-4 px-5 bg-gray-50">
                            <Text className="text-base font-medium text-teal-700 text-right">10% of Interest</Text>
                        </View>
                    </View>

                    {/* Summary Items - Number of free withdrawals */}
                    <View className="flex-row">
                        <View className="flex-1 py-4 px-5">
                            <Text className="text-base font-medium text-gray-800">Number of free withdrawals</Text>
                        </View>
                        <View className="flex-1 py-4 px-5 bg-gray-50">
                            <Text className="text-base font-medium text-teal-700 text-right">Anytime</Text>
                        </View>
                    </View>
                </View>

                {/* Plan Information Section */}
                <Text className="text-lg font-bold mb-4">Plan Information</Text>

                <View className="bg-teal-50 rounded-lg p-5 mb-6">
                    {/* Saving Target */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">What are you saving towards?</Text>
                        <Text className="text-base text-teal-700">I have a target</Text>
                    </View>

                    {/* Plan Name */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">Name of savings plan</Text>
                        <Text className="text-base text-teal-700">School fees</Text>
                    </View>

                    {/* Target Amount */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">How much are you aiming to save?</Text>
                        <Text className="text-base text-teal-700">₦340,000</Text>
                    </View>

                    {/* Start Date */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">Start Date</Text>
                        <Text className="text-base text-teal-700">₦13/05/2025</Text>
                    </View>

                    {/* Frequency */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">How often do you want to save?</Text>
                        <Text className="text-base text-teal-700">Monthly</Text>
                    </View>

                    {/* Contribution Method */}
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-1">How do you want to contribute?</Text>
                        <Text className="text-base text-teal-700">Manually</Text>
                    </View>

                    {/* Edit Button */}
                    <TouchableOpacity
                        className="flex-row justify-center items-center mt-2"
                        onPress={() => navigation.navigate('Savings')}
                    >
                        <Feather name="edit-2" size={20} color="#0C8D7D" />
                        <Text className="text-base font-medium text-teal-700 ml-2">Edit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View className="flex-row px-5 py-4">
                <TouchableOpacity
                    className="flex-1 border border-gray-300 rounded-lg py-3.5 mr-3 items-center justify-center"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-base font-semibold text-gray-800">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-teal-700 rounded-lg py-3.5 items-center justify-center"
                    onPress={() => alert('Plan created successfully!')}
                >
                    <Text className="text-base font-semibold text-white">Create Plan</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Indicator */}
            <View className="items-center pb-6">
                <View className="w-10 h-1.5 bg-black rounded" />
            </View>
        </SafeAreaView>
    );
}