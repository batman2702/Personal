
import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import api from '@/lib/api';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';

interface DashboardStats {
    totalEquipment: number;
    overdueInspections: number;
    upcomingInspections: number;
    complianceRate: number;
}

interface RecentInspection {
    id: string;
    date: string;
    status: string;
    equipment: { serialNumber: string };
    inspector: { name: string };
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recent, setRecent] = useState<RecentInspection[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/dashboard/stats');
            setStats(response.data.stats);
            setRecent(response.data.recentInspections);
        } catch (error) {
            console.error('Dashboard fetch error:', error);
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

    const StatCard = ({ title, value, icon, color }: any) => (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                {icon}
            </View>
            <View>
                <Text style={styles.cardValue}>{value}</Text>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, Inspector</Text>
                <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>

            <View style={styles.grid}>
                <StatCard
                    title="Total Equipment"
                    value={stats?.totalEquipment ?? '-'}
                    icon={<Feather name="box" size={24} color="#007AFF" />}
                    color="#007AFF"
                />
                <StatCard
                    title="Overdue"
                    value={stats?.overdueInspections ?? '-'}
                    icon={<MaterialIcons name="error-outline" size={24} color="#FF3B30" />}
                    color="#FF3B30"
                />
                <StatCard
                    title="Upcoming"
                    value={stats?.upcomingInspections ?? '-'}
                    icon={<Feather name="clock" size={24} color="#FF9500" />}
                    color="#FF9500"
                />
                <StatCard
                    title="Compliance"
                    value={stats ? `${stats.complianceRate}%` : '-'}
                    icon={<Feather name="check-circle" size={24} color="#34C759" />}
                    color="#34C759"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Inspections</Text>
                {recent.map((item) => (
                    <View key={item.id} style={styles.listItem}>
                        <View>
                            <Text style={styles.itemTitle}>{item.equipment.serialNumber}</Text>
                            <Text style={styles.itemSubtitle}>{new Date(item.date).toLocaleDateString()}</Text>
                        </View>
                        <View style={[
                            styles.badge,
                            { backgroundColor: item.status === 'Pass' ? '#34C75920' : '#FF3B3020' }
                        ]}>
                            <Text style={[
                                styles.badgeText,
                                { color: item.status === 'Pass' ? '#34C759' : '#FF3B30' }
                            ]}>{item.status}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    date: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    grid: {
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        width: '47%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    iconContainer: {
        padding: 10,
        borderRadius: 8,
    },
    cardValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontWeight: '600',
        fontSize: 16,
    },
    itemSubtitle: {
        color: '#888',
        marginTop: 4,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});
