import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle} from "react-native-svg";

const addIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 24 25" fill="none" >
                <Path d="M12 4.5V20.5" stroke="#00BC55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M4 12.5H20" stroke="#008080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>


        </View>
    );
};

export default  addIcon;
