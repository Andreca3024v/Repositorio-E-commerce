// screens/ManagementScreen.tsx (ACTUALIZADO CON MODAL DE EDICIÓN/CREACIÓN)

import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProductFormModal from '../components/ProductFormModal';
import { useStore, Product } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

// Componente de Tarjeta de Producto para la gestión


interface ManagementProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ManagementProductCard: React.FC<ManagementProductCardProps> = ({ product, onDelete, onEdit }) => (
    <View style={globalStyles.productItem}>
        <Text style={globalStyles.productEmoji}>{product.image}</Text>
        <View style={globalStyles.productInfo}>
            <Text style={globalStyles.productName}>{product.name}</Text>
            <Text style={globalStyles.productPrice}>${product.priceUSD.toFixed(2)} (Stock: {product.stock})</Text>
        </View>
        <View style={globalStyles.crudButtons}>
            <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => onEdit(product)}>
                <Icon name="edit" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(product.id)}>
                <Icon name="trash-2" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    </View>
);

export default function ManagementScreen() {
    const { products, deleteProduct, addProduct, updateProduct } = useStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null); // Producto a editar

    const handleEdit = (product: Product) => {
        setProductToEdit(product); // Carga el producto en el estado
        setIsModalVisible(true);   // Abre el modal
    };

    const handleAdd = () => {
        setProductToEdit(null); // Asegura que el formulario esté vacío
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setProductToEdit(null); // Limpia el producto de edición al cerrar
    };

    const handleFormSubmit = (productData: Product) => {
        if (productData.id) {
            // Si tiene ID, es una edición
            updateProduct(productData);
        } else {
            // Si no tiene ID, es una creación
            addProduct(productData);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <ScrollView style={globalStyles.screenContainer}>
                <Text style={[globalStyles.storeHeader, { paddingHorizontal: 15 }]}>
                    Panel de Gestión
                </Text>
                <Text style={globalStyles.screenTitle}>
                    Inventario de Figuras ({products.length})
                </Text>

                {products.length === 0 ? (
                    <Text style={globalStyles.emptyText}>No hay productos en el inventario.</Text>
                ) : (
                    products.map(product => (
                        <View key={product.id} style={{ marginHorizontal: 15 }}>
                            <ManagementProductCard
                                product={product}
                                onDelete={deleteProduct}
                                onEdit={handleEdit} // ✅ Función de Edición integrada
                            />
                        </View>
                    ))
                )}
                <View style={{ height: 100 }} /> 
            </ScrollView>

            {/* Botón Flotante para Añadir Producto (FAB) */}
            <TouchableOpacity
                style={globalStyles.fabButton}
                onPress={handleAdd} // ✅ Abre el modal en modo Creación
            >
                <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Modal de Formulario */}
            <ProductFormModal
                isVisible={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleFormSubmit}
                productToEdit={productToEdit} // Pasa el producto para edición
            />
        </View>
    );
}