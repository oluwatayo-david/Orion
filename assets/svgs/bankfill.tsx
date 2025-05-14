






import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect} from "react-native-svg";

const bankIcon = ({width , height , style,fill , fillOpacity , strokeColor }:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any , strokeColor?:any}) => {
    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 37 37" fill="none" >
                <Rect width={width} height={height} rx="5" fill={fill || "#008080"}/>
                <Path d="M9.3125 15.0693C9.3125 14.0127 9.74966 13.3651 10.6543 12.8744L14.3783 10.8543C16.3297 9.79585 17.3054 9.2666 18.375 9.2666C19.4446 9.2666 20.4203 9.79585 22.3717 10.8543L26.0957 12.8744C27.0003 13.3651 27.4375 14.0127 27.4375 15.0693C27.4375 15.3558 27.4375 15.4991 27.4054 15.6168C27.2368 16.2356 26.6615 16.3333 26.1059 16.3333H10.644C10.0885 16.3333 9.51325 16.2356 9.3446 15.6168C9.3125 15.4991 9.3125 15.3558 9.3125 15.0693Z" stroke={ strokeColor || "#008080"}  stroke-width="1.5"/>
                <Path d="M18.3713 13.6833H18.3803" stroke={ strokeColor || "#008080"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M11.125 16.3333V23.8416M14.75 16.3333V23.8416" stroke={ strokeColor  || "#008080"}  stroke-width="1.5"/>
                <Path d="M22 16.3333V23.8416M25.625 16.3333V23.8416" stroke={ strokeColor  || "#008080"}  stroke-width="1.5"/>
                <Path d="M24.7188 23.8416H12.0312C10.5297 23.8416 9.3125 25.028 9.3125 26.4916C9.3125 26.7354 9.51537 26.9332 9.76562 26.9332H26.9844C27.2346 26.9332 27.4375 26.7354 27.4375 26.4916C27.4375 25.028 26.2203 23.8416 24.7188 23.8416Z" stroke={ strokeColor || "#008080"}  stroke-width="1.5"/>
            </Svg>



        </View>
    );
};

export default  bankIcon;
