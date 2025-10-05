// screens/CartScreen.tsx

import React from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
// ELIMINADA: import CartItem from '../components/CartItem';
import Icon from 'react-native-vector-icons/Feather'; // Necesario para los íconos de + y -
import { Product, useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

export default function CartScreen() {
    const { getCartDetails, exchangeRate, clearCart, updateCartItemQuantity } = useStore();
    const { detailedCart, totalUSD, totalBS } = getCartDetails();

    const handleCheckout = () => {
        if (totalUSD > 0) {
            Alert.alert(
                'Confirmar Compra',
                `El total es $${totalUSD.toFixed(2)} USD (Bs. ${totalBS.toFixed(2)}). ¿Deseas finalizar la compra simulada?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Pagar', onPress: clearCart, style: 'default' },
                ]
            );
        } else {
            Alert.alert('Carrito Vacío', 'Agrega productos para finalizar la compra.');
        }
    };
    
    // Función para manejar la actualización de cantidad
    type CartItemType = {
        product: Product;
        productId: string;
        quantity: number;
        subtotalUSD: number;
    };

    const handleUpdateQuantity = (product: CartItemType, amount: number) => {
        const newQuantity = product.quantity + amount;
        
        if (newQuantity < 0) return;
        
        if (newQuantity === 0) {
             Alert.alert(
                'Eliminar Producto',
                `¿Estás seguro de que quieres eliminar "${product.product.name}" del carrito?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', onPress: () => updateCartItemQuantity(product.productId, 0), style: 'destructive' },
                ]
            );
            return;
        }

        updateCartItemQuantity(product.productId, newQuantity);
    };

    const renderTotal = () => (
        <View style={globalStyles.totalFinal}>
            <View style={globalStyles.totalContainer}>
                <Text style={globalStyles.totalLabelFinal}>TOTAL USD:</Text>
                <Text style={globalStyles.totalValueFinal}>${totalUSD.toFixed(2)}</Text>
            </View>
            <View style={globalStyles.totalContainer}>
                <Text style={globalStyles.totalLabelFinal}>TOTAL BS (Tasa {exchangeRate.toFixed(2)}):</Text>
                <Text style={globalStyles.totalValueFinal}>Bs. {totalBS.toFixed(2)}</Text>
            </View>

            {/* BOTÓN DE PAGAR */}
            <TouchableOpacity 
                style={[globalStyles.addButton, { marginTop: 20, marginBottom: 0, marginHorizontal: 0 }]}
                onPress={handleCheckout}
                disabled={totalUSD === 0}
            >
                <Text style={globalStyles.addButtonText}>FINALIZAR COMPRA (Simulada)</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCartItem = ({ item }: { item: CartItemType }) => (
        <View style={globalStyles.cartItem}>
            <Text style={globalStyles.cartItemText}>
                {item.product.image} {item.product.name} ({item.quantity})
            </Text>
            
            <View style={globalStyles.cartControls}>
                {/* Botón de Restar */}
                <TouchableOpacity onPress={() => handleUpdateQuantity(item, -1)} style={{ padding: 5 }}>
                    <Icon name="minus-circle" size={24} color="#FF3B30" />
                </TouchableOpacity>
                <Text style={globalStyles.cartQuantity}>{item.quantity}</Text>
                {/* Botón de Sumar */}
                <TouchableOpacity onPress={() => handleUpdateQuantity(item, 1)} style={{ padding: 5 }}>
                    <Icon name="plus-circle" size={24} color="#34C759" />
                </TouchableOpacity>
            </View>
            
            <Text style={globalStyles.cartPrice}>
                ${item.subtotalUSD.toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <Text style={[globalStyles.storeHeader, { paddingHorizontal: 15 }]}>Tu Carrito de Compras</Text>
            <Text style={globalStyles.screenTitle}>Resumen</Text>

            <FlatList
                data={detailedCart}
                keyExtractor={item => item.productId}
                renderItem={renderCartItem} // Usamos la función integrada
                ListEmptyComponent={<Text style={globalStyles.emptyText}>Tu carrito está vacío.</Text>}
                ListFooterComponent={totalUSD > 0 ? renderTotal : null}
                contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 20 }} 
            />
        </View>
    );
}