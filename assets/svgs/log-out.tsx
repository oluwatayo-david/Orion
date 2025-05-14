

import React from "react";
        import { View } from "react-native";
        import Svg, { Path , Circle ,Rect , G , Defs , ClipPath} from "react-native-svg";

        const customerIcon = ({width , height , style,fill , fillOpacity}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any}) => {
        return (
<View style={style}>

        <Svg width={ width || "36"} height={ height || "36"} viewBox="0 0 36 36" fill="none" >
                <Rect y="0.287109" width="36" height="34.8907" rx="10" fill="#F3F3F3"/>
                <G clip-path="url(#clip0_103_4604)">
                        <Path d="M15.0166 17.7324H26.4166" stroke="#F0432C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M18.4208 8.89355H12.5624C11.4541 8.89355 10.5833 9.76167 10.5833 10.7876V24.5985C10.5833 25.7034 11.4541 26.5715 12.5624 26.5715H18.4208" stroke="#F0432C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M23.4082 14.7334L26.4165 17.7323L23.4082 20.7313" stroke="#F0432C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </G>
                <Defs>
                        <ClipPath id="clip0_103_4604">
                                <Rect width="19" height="18.9407" fill="white" transform="translate(9 8.26221)"/>
                        </ClipPath>
                </Defs>
        </Svg>



        </View>
        );
        };

        export default customerIcon;










