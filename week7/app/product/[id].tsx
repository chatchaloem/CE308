import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function ProductScreen() {
    const { id, name, price } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product details</Text>
            <Text style={styles.label}>Product ID: {id}</Text>
            <Text style={styles.label}>name: {name}</Text>
            <Text style={styles.label}>price: ${price}</Text>

            <Button
                title="Go back"
                onPress={() => router.back()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});