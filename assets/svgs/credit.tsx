
import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect , G , Defs , ClipPath} from "react-native-svg";

const creditIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
    return (
        <View style={style}>
            <Svg width={width ||"34"} height={ height || "34"} viewBox="0 0 34 34" fill="none" >
                <Rect width="34" height="34" rx="17" fill="#272727"/>
                <Path d="M23.0501 12.4301C23.0528 12.2304 22.9747 12.038 22.8334 11.8968C22.6922 11.7555 22.4998 11.6774 22.3001 11.6801C21.8859 11.6801 21.5501 12.0159 21.5501 12.4301V20.5001L12.2201 11.1601C12.0331 10.9595 11.7516 10.8769 11.4858 10.9447C11.2201 11.0126 11.0126 11.2201 10.9447 11.4858C10.8769 11.7516 10.9595 12.0331 11.1601 12.2201L20.5001 21.5601H12.4301C12.0159 21.5601 11.6801 21.8959 11.6801 22.3101C11.6801 22.7243 12.0159 23.0601 12.4301 23.0601H22.3101C22.7243 23.0601 23.0601 22.7243 23.0601 22.3101L23.0501 12.4301Z" fill="#00BC55"/>
            </Svg>




        </View>
    );
};

export default creditIcon;
