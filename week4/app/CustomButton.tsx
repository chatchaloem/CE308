import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
};

export const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
}: CustomButtonProps) => {
  const variantClasses = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    danger: "bg-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={[
        variantClasses[variant],
        sizeClasses[size],
        "rounded-lg active:bg-opacity-70 self-start",
      ].join(" ")}
    >
      <Text className="text-white font-semibold text-base text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
