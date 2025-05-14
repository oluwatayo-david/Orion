import React from "react";
        import { View } from "react-native";
        import Svg, { Path , Circle} from "react-native-svg";

        const OrionIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
        return (
<View style={style}>
        <Svg width={width} height={height} viewBox="0 0 180 199" fill="none" >
                <Path d="M152.559 97.5C152.559 115.141 158.027 128.432 163.737 139.163C191.041 190.475 98.2598 207.928 47.8071 179.066C17.1914 161.552 0 133.11 0 97.5C0 61.6208 15.2085 34.229 45.7292 17.7464C97.7833 -10.3653 195.778 7.45374 164.519 57.6809C158.333 67.6195 152.559 80.2096 152.559 97.5Z" fill={fill || "#008080"}/>
                <Circle cx="90" cy="99" r="54" fill="white"/>
                <Path d="M156.5 98.5C156.5 138.826 124.031 171.5 84 171.5C43.9689 171.5 11.5 138.826 11.5 98.5C11.5 58.1737 43.9689 25.5 84 25.5C124.031 25.5 156.5 58.1737 156.5 98.5Z" stroke="#00D1D1" stroke-width="3"/>
        </Svg>


        </View>
        );
        };

        export default  OrionIcon;
