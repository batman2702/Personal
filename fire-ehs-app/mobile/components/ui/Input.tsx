
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps { }

export function Input(props: InputProps) {
    return (
        <TextInput
            style={[styles.input, props.style]}
            placeholderTextColor="#888"
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
});
