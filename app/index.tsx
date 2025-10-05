// app/index.tsx (ACTUALIZADO CON PESTAÑA DE GESTIÓN)

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NavButton from '../components/NavButton';

// Importación de Contexto y Estilos
import { StoreProvider, useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

// Importación de Pantallas
import AuthScreen from '../screens/AuthScreen';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ManagementScreen from '../screens/ManagementScreen'; // 🚨 IMPORTAR la nueva pantalla
import ProfileScreen from '../screens/ProfileScreen';

// --- Definición de Pestañas de Navegación (Gestión incluida y accesible) ---
const TABS = [
    { name: 'Home', component: HomeScreen, icon: 'home' },
    { name: 'Cart', component: CartScreen, icon: 'shopping-cart' },
    { name: 'Management', component: ManagementScreen, icon: 'layers' }, // 🚨 NUEVA PESTAÑA
    { name: 'Profile', component: ProfileScreen, icon: 'user' },
];

function TabBar() {
    const { totalItems } = useStore().getCartDetails(); 
    const [activeTab, setActiveTab] = useState('Home');
    
    const ActiveScreen = TABS.find(tab => tab.name === activeTab)?.component || HomeScreen;

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ActiveScreen />
            </SafeAreaView>

            {/* Barra de Navegación Inferior */}
            <View style={{ flexDirection: 'row', height: 90, borderTopWidth: 1, borderTopColor: '#E5E5EA', backgroundColor: '#fff' }}>
                {TABS.map((tab) => (
                    <NavButton
                        key={tab.name}
                        icon={tab.icon as keyof typeof Feather.glyphMap}
                        label={tab.name === 'Cart' ? `Carrito (${totalItems})` : tab.name === 'Management' ? 'Gestión' : tab.name}
                        target={tab.name}
                        isActive={activeTab === tab.name}
                        onPress={setActiveTab}
                    />
                ))}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default function App() {
    return (
        <StoreProvider>
            <AppContent />
        </StoreProvider>
    );
}

function AppContent() {
    const { currentUser, loading } = useStore(); 

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }
    
    // El TabBar se renderiza solo si hay un currentUser
    if (!currentUser) { 
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <AuthScreen />
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }

    return <TabBar />;
}