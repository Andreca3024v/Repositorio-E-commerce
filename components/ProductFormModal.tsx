// components/ProductFormModal.tsx

import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles as globalStyles } from '../styles/globalStyles';

// Tipado básico del producto
import { Product } from '../context/StoreContext';

interface ProductFormModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (productData: Product) => void;
    // Si se pasa un producto, estamos editando; si es null, estamos creando
    productToEdit: Product | null; 
}

// Estado inicial del formulario
const initialFormState: Product = {
    id: '',
    name: '',
    description: '',
    priceUSD: 0,
    stock: 0,
    image: '',
    category: 'Figuras de Anime', // Usa CATEGORY_ANIME si tienes la constante
};

export default function ProductFormModal({ isVisible, onClose, onSubmit, productToEdit }: ProductFormModalProps) {
    const [formData, setFormData] = useState<Product>(initialFormState);

    // Cargar datos del producto si estamos editando
    useEffect(() => {
        if (productToEdit) {
            // Asegurarse de que los números sean manejados como cadenas para los TextInput
            setFormData({
                ...productToEdit,
                priceUSD: productToEdit.priceUSD.toString() as any, // Convierte a string temporalmente
                stock: productToEdit.stock.toString() as any,     // Convierte a string temporalmente
            });
        } else {
            setFormData(initialFormState);
        }
    }, [productToEdit, isVisible]);

    const handleChange = (key: keyof Product, value: string | number) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const { name, description, image, priceUSD, stock } = formData;

        if (!name || !description || !image || !priceUSD || !stock) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        const numericPrice = parseFloat(priceUSD as any);
        const numericStock = parseInt(stock as any, 10);

        if (isNaN(numericPrice) || numericPrice <= 0 || isNaN(numericStock) || numericStock < 0) {
            Alert.alert('Error', 'El precio y el stock deben ser números válidos y positivos.');
            return;
        }

        const finalData: Product = {
            ...formData,
            priceUSD: numericPrice,
            stock: numericStock,
            ...(productToEdit && { id: productToEdit.id })
        };

        onSubmit(finalData);
        onClose();
    };

    const title = productToEdit ? 'Editar Figura' : 'Agregar Figura';

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={globalStyles.modalOverlay}>
                <View style={globalStyles.modalContent}>
                    <Text style={globalStyles.modalTitle}>{title}</Text>
                    
                    {/* Nombre */}
                    <Text style={globalStyles.formLabel}>Nombre</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Nombre de la figura"
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    {/* Descripción */}
                    <Text style={globalStyles.formLabel}>Descripción</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Descripción corta"
                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                        multiline
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* Precio USD */}
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={globalStyles.formLabel}>Precio (USD)</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="0.00"
                                value={formData.priceUSD.toString()}
                                onChangeText={(text) => handleChange('priceUSD', text.replace(/[^0-9.]/g, ''))}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Stock */}
                        <View style={{ flex: 1 }}>
                            <Text style={globalStyles.formLabel}>Stock</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="0"
                                value={formData.stock.toString()}
                                onChangeText={(text) => handleChange('stock', text.replace(/[^0-9]/g, ''))}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    {/* Imagen o Emoji */}
                    <Text style={globalStyles.formLabel}>Imagen/Emoji (Icono)</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Ej: 🤖 o URL de imagen"
                        value={formData.image}
                        onChangeText={(text) => handleChange('image', text)}
                        maxLength={200}
                    />

                    <View style={globalStyles.formButtons}>
                        <TouchableOpacity style={{ ...globalStyles.addButton, backgroundColor: '#8E8E93', flex: 1, marginRight: 10 }} onPress={onClose}>
                            <Text style={globalStyles.addButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...globalStyles.addButton, backgroundColor: '#007AFF', flex: 1 }} onPress={handleSubmit}>
                            <Text style={globalStyles.addButtonText}>{productToEdit ? 'Guardar Cambios' : 'Crear Producto'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}