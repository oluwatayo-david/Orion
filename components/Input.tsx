import React, {useState} from "react";
import {Text, TextInput, View} from "react-native";
import {Controller} from "react-hook-form";
import {CustomInputProps} from "@/api/interfaces/customInput";
import {Dropdown} from "react-native-element-dropdown";
import {generalSans} from "@/constants/Font";

export const CustomInput: React.FC<CustomInputProps> = ({
                                                            label,
                                                            BackgroundColor,
                                                            icon,
                                                            name,
                                                            control,
                                                            placeholder,
                                                            secureTextEntry = false,
                                                            rules,
                                                            type = "text",
                                                            data = [],
                                                            style,
                                                            classname,
                                                            onChange,
                                                            value, editable, maxLength, keyboardType, multiline , numberOfLines, size
                                                        }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            defaultValue={value}
            render={({field: {onChange: fieldOnChange, value}, fieldState: {error}}) => (
                <View className={`mb-4 ${classname}`}>
                    {/*  Label */}
                    <Text className="text-gray-600 text-sm mb-1" style={{fontFamily: generalSans.Medium}}>
                        {label}
                    </Text>

                    {/*  Input Container */}
                    <View
                        className={`border rounded-lg py-3  px-2 bg-${BackgroundColor} ${

                            error ? "border-red-500" : isFocused ? "border-[#008080]" : "border-gray-300"
                        }`}
                        style={{height:size}}
                    >
                        {type === "dropdown" ? (
                            //  Dropdown Logic
                            <Dropdown
                                style={{paddingHorizontal: 8, paddingVertical: 2}}
                                placeholderStyle={{fontSize: 16, color: "gray"}}
                                selectedTextStyle={{fontSize: 16}}
                                data={data}
                                search
                                disable={editable}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={placeholder}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(item) => {
                                    fieldOnChange(item.value);
                                    onChange?.(item);
                                    setIsFocused(false);
                                }}


                            />
                        ) : (

                            <View className="rounded-lg px-2 flex-row items-center justify-between">
                                <TextInput
                                    editable={editable}
                                    value={value}
                                    onChangeText={(text) => {
                                        fieldOnChange(text);
                                        onChange?.(text);
                                    }}
                                    placeholder={placeholder}
                                    secureTextEntry={secureTextEntry}
                                    className="text-gray-800 text-base flex-1"
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    style={style}
                                    maxLength={maxLength}
                                   keyboardType={keyboardType}
                                    multiline={multiline}
                                    numberOfLines={numberOfLines}
                                />

                                {/*  Icon Logic Restored */}
                                {icon && <View className="ml-2">{icon}</View>}
                            </View>
                        )}
                    </View>

                    {/*  Error Message */}
                    {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
                </View>
            )}
        />
    );
};
