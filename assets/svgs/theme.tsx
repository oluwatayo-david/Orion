import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect , G , Defs , ClipPath} from "react-native-svg";

const themeIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
    return (
        <View style={style}>

            <Svg width={width || "36"} height={height || "36"} viewBox="0 0 36 36" fill="none" >
                <Rect y="0.5" width="36" height="35" rx="10" fill="#E6F8EE"/>
                <Path d="M18 28C23.5228 28 28 23.5228 28 18C28 12.4771 23.5228 8 18 8C12.4771 8 8 12.4771 8 18C8 23.5228 12.4771 28 18 28ZM18 26.5V9.5C22.6944 9.5 26.5 13.3056 26.5 18C26.5 22.6944 22.6944 26.5 18 26.5Z" fill="#008080"/>
            </Svg>


        </View>
    );
};

export default themeIcon;













