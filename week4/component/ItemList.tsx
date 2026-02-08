import { FlatList } from "react-native";
import { ItemCard } from "./ProductCard";

type Item = {
  id: string;
  productName: string;
  price: number;
  pcs: number;
  btnSize: "small" | "medium" | "large";
  btnColor: "primary" | "secondary" | "danger";
};

type ItemListProps = {
  items: Item[];
};

export const ItemList = ({ items }: ItemListProps) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          name={item.productName}
          price={item.price}
          pcs={item.pcs}
          btnSize={
            item.btnSize === "small"
              ? "sm"
              : item.btnSize === "large"
              ? "lg"
              : "md"
          }
          btnColor={item.btnColor}
          onBuy={() => console.log("ซื้อ", item.productName)}
        />
      )}
    />
  );
};
