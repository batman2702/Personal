
import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Feather } from '@expo/vector-icons';

interface Equipment {
    id: string;
    type: string;
    serialNumber: string;
    location: { name: string };
    status: string;
}

export default function InventoryScreen() {
    const [items, setItems] = useState<Equipment[]>([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get(`/equipment?q=${search}`);
            setItems(response.data);
        } catch (error) {
            console.error('Inventory fetch error:', error);
        }
    }, [search]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [fetchData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [fetchData]);

    const renderItem = ({ item }: { item: Equipment }) => (
        <View style={styles.item}>
            <View style={styles.icon}>
                <Feather name="box" size={24} color="#666" />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{item.type} - {item.serialNumber}</Text>
                <Text style={styles.subtitle}>{item.location?.name}</Text>
            </View>
            <View style={[styles.status, { backgroundColor: item.status === 'Active' ? '#E8F5E9' : '#FFEBEE' }]}>
                <Text style={{ color: item.status === 'Active' ? '#2E7D32' : '#C62828', fontSize: 12 }}>
                    {item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Inventory</Text>
                <Input
                    placeholder="Search equipment..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        borderWidth: 0,
        height: 40,
    },
    list: {
        padding: 15,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    subtitle: {
        color: '#888',
        fontSize: 14,
    },
    status: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
});
