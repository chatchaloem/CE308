import ".global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
}  from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

// Interface for form state
interface FormData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

//Interface for form errors Messages
interface FormErrors {
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Index() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // State for form errors Messages
  const [formErrors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullname":
        if (!value.trim()) {
          return "กรุณากรอกชื่อ-นามสกุล";
        }
        if (value.trim().length < 3) {
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        }
        return undefined;

        case "email":
          if (!value.trim()) {
            return "กรุณากรอกอีเมล";
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            return "รูปแบบอีเมลไม่ถูกต้อง";
          }
          return undefined;

      case "phone":
        if (!value.trim()) {
          return "กรุณากรอกเบอร์โทรศัพท์";
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
        }
        return undefined;

      case "password":
        if (!value) {
          return "กรุณากรอกรหัสผ่าน";
        }
        if (value.length < 6) {
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }
        return undefined;

      case "confirmPassword":
        if (!value) {
          return "กรุณากรอกยืนยันรหัสผ่าน";
        }
        if (value !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ!",
        `ลทะเบียนสำเร็จ\n\nชื่อ: ${formData.fullname}\nอีเมล: ${formData.email}\nเบอร์โทรศัพท์: ${formData.phone}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("From Data:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancle",
          },
        ]
      );
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          {/* Form Container*/}
          <View className="-mt-6 px-6">
            {/* ชื่อ-นามสกุล */}
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullname}
              onChangeText={(value) => handleChange("fullname", value)}
              onBlur={() => handleBlur("fullname")}
              error={formErrors.fullname}
              touched= {!!touched.fullname}
              autoCapitalize="words" //ขึ้นต้นด้วยตัวใหญ่ทุกคำ
            />
          
            {/* อีเมล */}
            <CustomInput
              label="อีเมล"
              placeholder="example@gmail.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={formErrors.email}
              touched= {!!touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* เบอร์โทรศัพท์ */}
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0854758569"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={formErrors.phone}
              touched= {!!touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {/* รหัสผ่าน */}
            <CustomInput
              label="รหัสผ่าน"
              placeholder="กรุณากรอกรหัสผ่าน (อย่างน้อย 6 ตัว)"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={formErrors.password}
              touched= {!!touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* ยืนยันรหัสผ่าน */}
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="กรุณากรอกยืนยันรหัสผ่าน"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={formErrors.confirmPassword}
              youched= {!!touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Button */}
            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                isLoading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold mb-2">
                คำแนะนำ
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                -กรอกข้อมูลให้ครบถ้วน{"\n"}
                -อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                -เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}
                -รหัสผ่านต้องมีอย่างน้อย 6 ตัว{"\n"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}