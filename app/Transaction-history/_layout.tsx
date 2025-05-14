import {Slot, Stack} from 'expo-router';
import {View} from 'react-native';

export default function HistoryLayout() {
    return (
        <View className={'bg-background'} style={{flex: 1}}>
            <Slot/>
        </View>

    )
}