
import React from "react";
import { View } from "react-native";
import Svg, { Path , Circle ,Rect , G , Defs , ClipPath} from "react-native-svg";

const homeIcon = ({width , height , style,fill , fillOpacity , iconFill}:  {width:any , height:any , style?:any,  fill?:string, fillOpacity?:any , iconFill?:any}) => {
    return (
        <View style={style}>
            <Svg width={width ||"42"} height={height ||"42"} viewBox="0 0 42 42" fill={fill} >
                <Path d="M22.2371 4.01274L37.9871 19.7627C39.0896 20.8652 38.3091 22.75 36.7499 22.75H34.9999V33.25C34.9999 34.6424 34.4468 35.9777 33.4622 36.9623C32.4776 37.9469 31.1423 38.5 29.7499 38.5H27.9999V26.25C28 24.9109 27.4883 23.6223 26.5696 22.648C25.651 21.6737 24.3947 21.0873 23.0579 21.0087L22.7499 21H19.2499C17.8575 21 16.5221 21.5531 15.5376 22.5377C14.553 23.5222 13.9999 24.8576 13.9999 26.25V38.5H12.2499C10.8575 38.5 9.52214 37.9469 8.53757 36.9623C7.55301 35.9777 6.99988 34.6424 6.99988 33.25V22.75H5.24988C3.69238 22.75 2.91013 20.8652 4.01263 19.7627L19.7626 4.01274C20.0908 3.68467 20.5358 3.50037 20.9999 3.50037C21.4639 3.50037 21.909 3.68467 22.2371 4.01274ZM22.7499 24.5C23.214 24.5 23.6591 24.6844 23.9873 25.0126C24.3155 25.3407 24.4999 25.7859 24.4999 26.25V38.5H17.4999V26.25C17.4999 25.8214 17.6573 25.4077 17.9421 25.0873C18.227 24.767 18.6194 24.5624 19.0451 24.5122L19.2499 24.5H22.7499Z" stroke={iconFill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>






        </View>
    );
};

export default  homeIcon;
