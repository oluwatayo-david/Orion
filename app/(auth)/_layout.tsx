import {Slot} from 'expo-router';
import {View} from 'react-native';

export default function AuthLayout() {
    return (
        <View className={'bg-background'} style={{flex: 1}}>
            <Slot/>
        </View>

    )
}