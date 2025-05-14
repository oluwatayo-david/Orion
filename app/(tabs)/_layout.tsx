import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Import Icons
import Home from "@/assets/svgs/Home";
import Analytics from "@/assets/svgs/analytics";
import OrionIcon from "@/assets/svgs/orionIcon";
import Savings from "@/assets/svgs/savings";
import CardIcon from "@/assets/svgs/card";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    paddingTop :10,
                    marginHorizontal: 15,
                    borderRadius: 60,
                    height: 70,
                    bottom: 10,
                    backgroundColor: "white",
                },
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabelStyle: {
                        marginTop:5
                    },
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                backgroundColor: focused ? '#008080' : 'transparent',
                                padding: 8,
                                borderRadius: 50,
                            }}
                        >
                            <Home height={30} width={30} fill={focused ? "#ffffff" : "#ffffff"} iconFill={focused ? "#ffffff" : "#000000"} />
                        </View>
                    ),
                }}
            />

            {/* Analytics Tab */}
            <Tabs.Screen
                name="analytics"
                options={{
                    title: 'Analytics',
                    tabBarLabelStyle: {
                      marginTop:5
                    },
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                backgroundColor: focused ? '#008080' : 'transparent',
                                padding: 8,
                                borderRadius: 50,
                            }}
                        >
                            <Analytics height={30} width={30} fill={focused ? "#ffffff" : "#000000"}  iconFill={focused ? "#ffffff" : "#000000"}/>
                        </View>
                    ),
                }}
            />

            {/* AI Tab */}
            <Tabs.Screen
                name="ai"
                options={{
                    tabBarLabelStyle: {
                        marginTop:5
                    },
                    title: '',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                padding: 8,
                                borderRadius: 50,
                            }}
                        >
                            <OrionIcon height={45} width={45} />
                        </View>
                    ),
                }}
            />

            {/* Card Tab */}
            <Tabs.Screen
                name="card"
                options={{
                    tabBarLabelStyle: {
                        marginTop:5
                    },
                    title: 'Card',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                backgroundColor: focused ? '#008080' : 'transparent',
                                padding: 8,
                                borderRadius: 50,
                            }}
                        >
                            <CardIcon height={30} width={30} fill={focused ? "#ffffff" : "#000000"} iconFill={focused ? "#ffffff" : "#000000"} />
                        </View>
                    ),
                }}
            />

            {/* Savings Tab */}
            <Tabs.Screen
                name="savings"
                options={{
                    tabBarLabelStyle: {
                        marginTop:5
                    },
                    title: 'Savings',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                backgroundColor: focused ? '#008080' : 'transparent',
                                padding: 8,
                                borderRadius: 50,
                            }}
                        >
                            <Savings height={30} width={30} fill={focused ? "#ffffff" : "#000000"} iconFill={focused ? "#ffffff" : "#000000"} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
