
import { View, Text, StyleSheet } from 'react-native';

export default function ScanScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Scanner Coming Soon</Text>
            {/* This will be replaced with real Camera implementation */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
});
