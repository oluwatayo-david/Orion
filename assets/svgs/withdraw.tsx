









import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect , G , Defs , ClipPath, Ellipse} from "react-native-svg";

const withdrawIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
    return (
        <View style={style}>
            <Svg width={width || "24"} height={ height || "25"} viewBox="0 0 24 25" fill="none">
                <Path d="M18.9349 14.4453L18.2646 10.7968C17.9751 9.22096 17.8303 8.43303 17.257 7.96651C16.6837 7.5 15.8602 7.5 14.2132 7.5H9.78685C8.1398 7.5 7.31628 7.5 6.74298 7.96651C6.16968 8.43303 6.02492 9.22096 5.73538 10.7968L5.06506 14.4453C4.46408 17.7162 4.16359 19.3517 5.08889 20.4259C6.01419 21.5 7.72355 21.5 11.1423 21.5H12.8577C16.2765 21.5 17.9858 21.5 18.9111 20.4259C19.8364 19.3517 19.5359 17.7162 18.9349 14.4453Z" stroke="#008080" stroke-width="1.5" stroke-linecap="round"/>
                <Path d="M12 11V17.5M9.5 15.5L12 18L14.5 15.5" stroke="#008080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M21 11.5C21.1568 11.4209 21.2931 11.3212 21.4142 11.1955C22 10.5875 22 9.60893 22 7.65176C22 5.6946 22 4.71602 21.4142 4.10801C20.8284 3.5 19.8856 3.5 18 3.5H6C4.11438 3.5 3.17157 3.5 2.58579 4.10801C2 4.71602 2 5.6946 2 7.65176C2 9.60893 2 10.5875 2.58579 11.1955C2.70688 11.3212 2.84322 11.4209 3 11.5" stroke="#008080" stroke-width="1.5" stroke-linecap="round"/>
            </Svg>







        </View>
    );
};

export default  withdrawIcon;
