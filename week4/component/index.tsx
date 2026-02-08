import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemList } from "./ItemList";

type Item = {
    id: string;
    productName: string;
    price: number;
    pcs: number;
    btnSize: "small" | "medium" | "large";
    btnColor: "primary" | "secondary" | "danger";
};

const items: Item[] = [
    {
        id: "1",
        productName: "Banana",
        price: 2000,
        pcs: 10,
        btnSize: "small",
        btnColor: "primary",
    },
    {
        id: "2",
        productName: "Mango",
        price: 3000,
        pcs: 5,
        btnSize: "medium",
        btnColor: "secondary",
    },
    {
        id: "3",
        productName: "Apple",
        price: 2500,
        pcs: 8,
        btnSize: "large",
        btnColor: "secondary",
    },
];

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ItemList items={items} />
        </SafeAreaView>
    );
}
