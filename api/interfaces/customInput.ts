export interface CustomInputProps {
    label?: string;
    name: string;
    control: any;
    placeholder?: string;
    secureTextEntry?: boolean;
    rules?: Record<string, any>;
    type?: "text" | "dropdown";
    data?: { label: string; value: string | number }[];
    onChange?: (value: string | number) => void;
    style?: any;
    BackgroundColor?: string;
    classname?: string;
    icon?: React.ReactNode;
    value?: any;
    editable?: boolean;
    maxLength?: number
    keyboardType?:any;
    multiline?:boolean ;
    numberOfLines?:number;
    size?:number;
}


export interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    country: string
    state: string
}


export interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
    styles?: string
    ExtraStyle?: any;
    textStyle?: any;
    icon?: any;
    backgroundcolor?: any;
    disabled?: boolean;
    fontFamily?: any;

}