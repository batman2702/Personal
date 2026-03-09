
import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Image } from 'react-native';
import api from '@/lib/api';
import { Feather } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';

interface Inspection {
    id: string;
    date: string;
    status: string;
    equipment: { serialNumber: string; type: string; location: { name: string } };
    inspector: { name: string };
}

export default function InspectionsScreen() {
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/inspections'); // Reusing existing endpoint
            setInspections(response.data);
        } catch (error) {
            console.error('Inspections fetch error:', error);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pass': return '#34C759';
            case 'fail': return '#FF3B30';
            default: return '#FF9500';
        }
    };

    const renderItem = ({ item }: { item: Inspection }) => {
        const statusColor = getStatusColor(item.status);
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconBox, { backgroundColor: '#F2F2F7' }]}>
                        <Feather name="clipboard" size={20} color="#666" />
                    </View>
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.serialNumber}>{item.equipment.serialNumber}</Text>
                        <Text style={styles.equipmentType}>{item.equipment.type}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                        <Feather name="map-pin" size={14} color="#888" />
                        <Text style={styles.footerText}>{item.equipment.location?.name || 'Unknown Location'}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Feather name="calendar" size={14} color="#888" />
                        <Text style={styles.footerText}>{new Date(item.date).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Inspections</Text>
                <Text style={styles.headerSubtitle}>Track compliance & safety checks</Text>
                {/* Could add filter tabs here later */}
            </View>

            <FlatList
                data={inspections}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
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
        padding: 24,
        paddingTop: 70,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#666',
        marginTop: 4,
    },
    list: {
        padding: 16,
        paddingBottom: 100, // Space for tab bar
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardHeaderText: {
        flex: 1,
    },
    serialNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    equipmentType: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#F2F2F7',
        marginVertical: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
});
