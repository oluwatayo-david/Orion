



import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle} from "react-native-svg";

const analyticsIcon = ({width , height , style,fill , fillOpacity , iconFill}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any , iconFill?:any}) => {
    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 42 42" fill="none" >
                <Path d="M12.25 31.5V28M21 31.5V26.25M29.75 31.5V22.75M4.375 21C4.375 13.1635 4.375 9.2435 6.80925 6.80925C9.2435 4.375 13.1617 4.375 21 4.375C28.8365 4.375 32.7565 4.375 35.1907 6.80925C37.625 9.2435 37.625 13.1617 37.625 21C37.625 28.8365 37.625 32.7565 35.1907 35.1907C32.7565 37.625 28.8383 37.625 21 37.625C13.1635 37.625 9.2435 37.625 6.80925 35.1907C4.375 32.7565 4.375 28.8383 4.375 21Z" stroke={iconFill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M10.4861 20.1005C14.2573 20.2265 22.8096 19.6577 27.6746 11.9367M24.4861 11.004L27.7691 10.4755C28.1681 10.4247 28.7561 10.7415 28.9013 11.1177L29.7676 13.9842" stroke={iconFill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>


        </View>
    );
};

export default  analyticsIcon;
