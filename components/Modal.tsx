import React from "react";
import { Modal, View } from "react-native";

const PopModal = ({ visible=false, children, onRequestClose} :{visible:boolean , children:any, onRequestClose:any}) => {
    return (
        <Modal animationType="fade" transparent={true}  visible={visible} onRequestClose={onRequestClose}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                {children}
            </View>
        </Modal>
    );
};


export default PopModal;
