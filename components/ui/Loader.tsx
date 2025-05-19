import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Animated from "react-native-reanimated";
import OrionIcon from "@/assets/svgs/orionIcon";

const Loader = ({loading}: { loading: boolean }) => (
    <Modal
        transparent={true}
        visible={loading}
        animationType={'fade'}
    >
        <View style={styles.modalBackground} className={'animate-pulse'}>
            <Animated.View style={styles.activityIndicatorWrapper} className={'animate-pulse'}>

<OrionIcon width={70} height={70}  style={{zIndex: 1000}} />
            </Animated.View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000020',
    },
    activityIndicatorWrapper: {
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loader;
