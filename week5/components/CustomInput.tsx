import react from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

interface CustomInputProps extends TextInputProps {
    label: string;
    error?: string;
    touched?: boolean;
}


export default function CustomInput({
    label,
    error,
    touched,
    ...props
}: CustomInputProps) {
    const hasError = touched && error;

 const charCount = props.value ? props.value.toString().length : 0;

    return (
        <View className="w-full mb-4">
            {/* Label */}
            <Text className="text-gray-700 font-semibold mb-2 text-base">
                {label}
            </Text>

            {/* Input Field */}
            <TextInput
                className={`
                    w-full px-4 py-3 rounded-lg border-2
                    ${hasError ? 'border-red-500' : 'border-gray-300'}
                    ${props.editable === false ? 'bg-gray-100' : 'bg-white'}
                    text-base text-gray-800
                    `}
                placeholderTextColor="#9CA3AF"
                {...props}
            />

            {/* Error Message */}
            {props.maxLength && (
                <Text className="text-right text-xs text-gray-400 mt-1">
                    {charCount}/{props.maxLength}
                </Text>
            )}

            {hasError && (
                <Text className="text-red-500 text-sm mt-1">
                    {error}
                </Text>
            )}
        </View>
    );
}