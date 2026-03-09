
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function ProfileScreen() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        SecureStore.getItemAsync('user_data').then(data => {
            if (data) setUser(JSON.parse(data));
        });
    }, []);

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await SecureStore.deleteItemAsync('auth_token');
                        await SecureStore.deleteItemAsync('user_data');
                        router.replace('/login');
                    }
                }
            ]
        );
    };

    const MenuOption = ({ icon, label, onPress, color = "#000" }: any) => (
        <TouchableOpacity style={styles.option} onPress={onPress}>
            <View style={[styles.iconBox, { backgroundColor: '#F2F2F7' }]}>
                <Feather name={icon} size={20} color={color} />
            </View>
            <Text style={[styles.optionText, { color }]}>{label}</Text>
            <Feather name="chevron-right" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user?.name?.charAt(0) || 'U'}
                    </Text>
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
                <Text style={styles.role}>{user?.role || 'Inspector'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.optionsContainer}>
                    <MenuOption icon="bell" label="Notifications" onPress={() => { }} />
                    <MenuOption icon="lock" label="Change Password" onPress={() => { }} />
                    <MenuOption icon="help-circle" label="Help & Support" onPress={() => { }} />
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.optionsContainer}>
                    <MenuOption
                        icon="log-out"
                        label="Logout"
                        onPress={handleLogout}
                        color="#FF3B30"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        padding: 24,
        paddingTop: 70,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
        color: '#000',
    },
    profileCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 24,
        marginBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    email: {
        fontSize: 15,
        color: '#666',
        marginBottom: 8,
    },
    role: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
        backgroundColor: '#007AFF15',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
        marginLeft: 10,
        textTransform: 'uppercase',
    },
    optionsContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
});
