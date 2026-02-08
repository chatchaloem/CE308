import "./global.css";
import { Text, View, FlatList } from "react-native";
import { useState } from "react";

import { CustomButton } from "@/components/CustomButton";
import { ItemCard } from "@/components/ItemCard";
import { CustomInput } from "@/components/CustomInput";

export default function Index() {
  const items = [
    {id: "1", productName: "Banana", price: 2000, pcs: 10, btnSize: "small", btnColor: "primary"},
    {id: "2", productName: "Apple", price: 3000, pcs: 5, btnSize: "medium", btnColor: "secondary"},
    {id: "3", productName: "Orange", price: 2500, pcs: 8, btnSize: "large", btnColor: "danger"}
  ];

  const sizeMap = {
    small: "sm",
    medium: "md",
    large: "lg",
  } as const;

  const colorMap = {
    primary: "primary",
    secondary: "secondary",
    danger: "danger",
  } as const;

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  const handleSubmit = () => {
    console.log({ productName, price, pcs });
  };

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            name={item.productName}
            price={item.price}
            pcs={item.pcs}
            btnSize={sizeMap[item.btnSize as keyof typeof sizeMap]}
            btnColor={colorMap[item.btnColor as keyof typeof colorMap]}
            onBuy={() => console.log("ซื้อ", item.productName)}
          />
        )}
        ListFooterComponent={
          <View className="mt-6">
            <Text className="text-lg font-bold mb-4">
              กรอกข้อมูลสินค้า
            </Text>

            <CustomInput
              label="ชื่อสินค้า"
              value={productName}
              onChangeText={setProductName}
              placeholder="กรุณากรอกชื่อสินค้า"
            />

            <CustomInput
              label="ราคา"
              value={price}
              onChangeText={setPrice}
              placeholder="กรุณากรอกราคา"
            />

            <CustomInput
              label="จำนวน"
              value={pcs}
              onChangeText={setPcs}
              placeholder="กรุณากรอกจำนวน"
            />

            <CustomButton
              title="ยืนยัน"
              size="md"
              variant="primary"
              onPress={handleSubmit}
            />
          </View>
        }
      />
    </View>
  );
}
