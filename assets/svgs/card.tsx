










import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect} from "react-native-svg";

const cardIcon = ({width , height , style,fill , fillOpacity, iconFill}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any  , iconFill?:any}) => {
    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 42 42" fill="none" >
                <Path d="M33.4688 7.875H8.53125C5.99419 7.875 3.9375 9.93169 3.9375 12.4688V29.5312C3.9375 32.0683 5.99419 34.125 8.53125 34.125H33.4688C36.0058 34.125 38.0625 32.0683 38.0625 29.5312V12.4688C38.0625 9.93169 36.0058 7.875 33.4688 7.875Z" stroke={iconFill} stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M3.9375 15.75H38.0625M10.5 24.6094H14.4375V26.25H10.5V24.6094Z" stroke={iconFill} stroke-width="1.875" stroke-linejoin="round" />
            </Svg>


        </View>
    );
};

export default  cardIcon;
