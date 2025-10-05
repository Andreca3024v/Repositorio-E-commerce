// screens/ProductsScreen.tsx

import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProductForm from '../components/ProductForm';
import { useStore, Product } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

export default function ProductsScreen() {
    const { products, exchangeRate, setExchangeRate, deleteProduct } = useStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [editProductData, setEditProductData] = useState<Product | null>(null);

    const openModalForCreate = () => {
        setEditProductData(null);
        setModalVisible(true);
    };

    const openModalForEdit = (product: Product) => {
        setEditProductData(product);
        setModalVisible(true);
    };

    const handleRateChange = (text: string) => {
        const cleanText = text.replace(/[^0-9.]/g, '');
        const newRate = parseFloat(cleanText);
        
        if (!isNaN(newRate) && newRate > 0) {
            setExchangeRate(newRate);
        } else if (cleanText === '') {
            setExchangeRate(0); 
        }
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={globalStyles.productItem}>
            <Text style={globalStyles.productEmoji}>{item.image}</Text>
            <View style={globalStyles.productInfo}>
                <Text style={globalStyles.productName}>{item.name}</Text>
                <Text style={globalStyles.productPrice}>${item.priceUSD.toFixed(2)} USD (Stock: {item.stock})</Text>
            </View>
            <View style={globalStyles.crudButtons}>
                <TouchableOpacity onPress={() => openModalForEdit(item)}>
                    <Feather name="edit" size={24} color="#FF9500" style={{ marginRight: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                    <Feather name="trash-2" size={24} color="#FF3B30" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.screenTitle}>Gestión de Figuras (ADMIN)</Text>
            
            {/* Tasa de Dólar */}
            <View style={globalStyles.rateContainer}>
                <Text style={globalStyles.rateLabel}>Tasa de Dólar (BS):</Text>
                <TextInput
                    style={globalStyles.rateInput}
                    keyboardType="numeric"
                    value={exchangeRate.toFixed(2).toString()} 
                    onChangeText={handleRateChange}
                />
            </View>

            <TouchableOpacity style={globalStyles.addButton} onPress={openModalForCreate}>
                <Text style={globalStyles.addButtonText}>+ Agregar Nueva Figura</Text>
            </TouchableOpacity>

            {/* Lista de Productos CRUD */}
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderProductItem}
                ListEmptyComponent={<Text style={globalStyles.emptyText}>No hay figuras en el inventario.</Text>}
            />
            
            {/* Modal de Formulario */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={globalStyles.modalOverlay}>
                    <ProductForm 
                        editProductData={editProductData} 
                        setModalVisible={setModalVisible} 
                    />
                </View>
            </Modal>
        </View>
    );
}