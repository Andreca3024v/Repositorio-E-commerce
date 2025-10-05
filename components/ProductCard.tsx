// components/ProductCard.tsx

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

// Interfaz (asegúrate de que estas propiedades coincidan con las de tu producto)
interface Product {
    id: string;
    name: string;
    priceUSD: number;
    image: string;
    stock: number;
    description?: string;
}

interface ProductCardProps {
    product: Product;
}

const MAX_DESC_LENGTH = 30;

export default function ProductCard({ product }: ProductCardProps) {
    const store = useStore();
    const addToCart = store && 'addToCart' in store ? store.addToCart : () => {};
    const isOutOfStock = product.stock <= 0;

    // ✅ CORRECCIÓN: Manejo seguro de la descripción para evitar el error 'substring'
    const rawDescription = product.description || ''; 
    const descToDisplay = rawDescription.length > MAX_DESC_LENGTH
        ? rawDescription.substring(0, MAX_DESC_LENGTH) + '...'
        : rawDescription;
    // FIN CORRECCIÓN

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addToCart(product.id, 1); // Añadimos 1 por defecto
        }
    };

    return (
        <View style={globalStyles.productCard}>
            <Text style={globalStyles.cardEmoji}>{product.image}</Text>
            <Text style={globalStyles.cardTitle}>{product.name}</Text>
            
            <Text style={globalStyles.cardDesc}>{descToDisplay || 'Producto especial'}</Text> 
            
            <Text style={globalStyles.cardPrice}>${product.priceUSD.toFixed(2)}</Text>
            
            {isOutOfStock && (
                <Text style={globalStyles.stockWarning}>AGOTADO</Text>
            )}

            <TouchableOpacity
                style={[globalStyles.addToCartButton, isOutOfStock && globalStyles.addToCartButtonDisabled]}
                onPress={handleAddToCart}
                disabled={isOutOfStock}
            >
                <Text style={globalStyles.addToCartText}>
                    {isOutOfStock ? 'Ver' : 'Añadir'}
                </Text>
                <Icon 
                    name="shopping-cart" 
                    size={16} 
                    color="white" 
                />
            </TouchableOpacity>
        </View>
    );
}