
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0, // Android shadow
                    height: Platform.OS === 'ios' ? 85 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 10,
                    backgroundColor: '#000000', // Premium dark tab bar
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 25,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: '#ffffff', // White for active
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)', // Dimmed white for inactive
                tabBarShowLabel: false, // Cleaner look without labels
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
                            <Feather name="home" size={24} color={color} />
                            {focused && <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="inspections"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
                            <Feather name="check-square" size={24} color={color} />
                            {focused && <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                width: 56,
                                height: 56,
                                backgroundColor: '#FF3B30',
                                borderRadius: 28,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 30, // Lift it up
                                shadowColor: '#FF3B30',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.4,
                                shadowRadius: 10,
                                elevation: 5,
                                borderWidth: 4,
                                borderColor: '#f2f2f7' // Match background
                            }}
                        >
                            <Feather name="camera" size={24} color="white" />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="inventory"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
                            <Feather name="box" size={24} color={color} />
                            {focused && <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
                            <Feather name="user" size={24} color={color} />
                            {focused && <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
