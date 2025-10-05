// screens/ProfileScreen.tsx

import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

export default function ProfileScreen() {
    const { currentUser, getCartDetails, handleLogout } = useStore();
    
    const { detailedCart } = getCartDetails();
    const totalProducts = detailedCart.length;

    const handleLogoutConfirm = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar la sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Cerrar Sesión', onPress: handleLogout, style: 'destructive' },
            ]
        );
    };

    // Componente auxiliar para las tarjetas de información
    interface InfoCardProps {
        label: string;
        value: string;
    }
    const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => (
        <View style={globalStyles.profileCard}>
            <Text style={globalStyles.profileLabel}>{label}</Text>
            <Text style={globalStyles.profileValue}>{value}</Text>
        </View>
    );

    return (
        <ScrollView style={globalStyles.screenContainer}>
            <Text style={[globalStyles.storeHeader, { paddingHorizontal: 15 }]}>
                Mi Cuenta
            </Text>
            <Text style={globalStyles.screenTitle}>
                ¡Hola, {currentUser?.username || 'Usuario'}!
            </Text>

            {/* --- BLOQUES DE INFORMACIÓN CLAVE --- */}
            
            {/* 1. Nombre de Usuario */}
            <InfoCard label="Nombre de Usuario" value={currentUser?.username || 'N/A'} />

            {/* 2. Productos en el Carrito */}
            <InfoCard 
                label="Productos en el Carrito" 
                value={`${totalProducts} producto${totalProducts !== 1 ? 's' : ''}`} 
            />
            
            {/* 3. Correo Electrónico (Información adicional útil) */}
            <InfoCard 
                label="Correo Electrónico de Contacto" 
                value={currentUser?.email || 'admin@zenith.com'} 
            />

            {/* --- CERRAR SESIÓN --- */}
            <TouchableOpacity 
                style={[globalStyles.profileCard, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FF3B3015' }]}
                onPress={handleLogoutConfirm}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF3B30' }}>
                    Cerrar Sesión
                </Text>
                <Icon name="log-out" size={24} color="#FF3B30" />
            </TouchableOpacity>

            <View style={{ height: 30 }} /> 
        </ScrollView>
    );
}