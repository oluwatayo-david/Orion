





















import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect , G , Defs , ClipPath} from "react-native-svg";

const DebitIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
    return (
        <View style={style}>
            <Svg width={width || "36"} height={height || "34"} viewBox="0 0 36 34" fill="none">
                <Rect width="36" height="34" rx="17" fill="#181818"/>
                <Path d="M23.9957 10.9602C23.9736 10.4064 23.5098 9.97534 22.9599 9.99733L13.9984 10.3558C13.4485 10.3778 13.0206 10.8445 13.0428 11.3983C13.0649 11.952 13.5287 12.3831 14.0786 12.3611L22.0444 12.0425L22.3652 20.0638C22.3874 20.6176 22.8511 21.0486 23.4011 21.0267C23.951 21.0047 24.3788 20.5379 24.3567 19.9842L23.9957 10.9602ZM12.7324 23.6808L23.7324 11.6808L22.2676 10.3192L11.2676 22.3192L12.7324 23.6808Z" fill="#FF3B30"/>
            </Svg>





        </View>
    );
};

export default DebitIcon;
