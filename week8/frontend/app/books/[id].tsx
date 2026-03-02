import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import { getBookById, updateBook } from "../../services/bookService";

export default function EditBookScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id);
                setTitle(book.title);
                setAuthor(book.author);
                setDescription(book.description);
                setPrice(book.price.toString());
            } catch {
                Alert.alert("Error", "Failed to load book");
                router.back();
            }
            
        }
    }, [id]);

    const handleUpdate = async () => {
        if (!title || !author || !price) {
            Alert.alert("Validation Error", "Title, Author and Price are required");
            return;
        }

        try {
            await updateBook(id, {
                title,
                author,
                description,
                price: parseFloat(price),
            });
            Alert.alert("Success", "Book updated successfully");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to update book");
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* header*/}
            <View className="bg-yellow-400 px-4 py-4">
                <Text className="text-xl font-bold text-white">Edit Book</Text>
            </View>
            <View className="p-4 gap-4">
                {/* title */}
                <View>
                    <Text className="text-gray-600 mb-1 font-medium">Title</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="Book title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                {/* author */}
                <View>
                    <Text className="text-gray-600 mb-1 font-medium">Author</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="Author name"
                        value={author}
                        onChangeText={setAuthor}
                    />
                </View>
                {/* description */}
                <View>
                    <Text className="text-gray-600 mb-1 font-medium">Description</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="short description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                        style={{ textAlignVertical: "top" }}
                    />
                </View>
                {/* price */}
                <View>
                    <Text className="text-gray-600 mb-1 font-medium">Price</Text>
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                        placeholder="0.00"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="decimal-pad"
                    />
                </View>
                {/* update */}
                <TouchableOpacity
                    className="bg-blue-600 py-3 px-4 rounded-xl items-center mt-2"
                    onPress={handleUpdate}
                >
                    <Text className="text-white font-bold font-bold">Update Book</Text>
                </TouchableOpacity>

                {/* cancel */}
                <TouchableOpacity
                    className="bg-gray-200 py-3 rounded-xl items-center"
                    onPress={() => router.back()}
                >
                    <Text className="text-gray-600 font-semibold text-base">Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}