// screens/HomeScreen.tsx

import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { APP_NAME } from '../constants';
import { useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

const LOGO_IMAGE = require('../assets/zenith_logo.png');

export default function HomeScreen() {
    const { products } = useStore();
    const [searchText, setSearchText] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
                              p.description.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearch;
    });

    return (
        <View style={globalStyles.screenContainer}>
            {/* NUEVO: Contenedor del Logo y Nombre en el encabezado */}
            <View style={globalStyles.headerLogoContainer}>
                <Image source={LOGO_IMAGE} style={globalStyles.smallLogo} resizeMode="contain" />
                <Text style={globalStyles.storeHeader}>{APP_NAME}</Text>
            </View>

            {/* Contenedor interno para el resto del contenido con el padding correcto */}
            <View style={{paddingHorizontal: 15, flex: 1}}>
                <Text style={globalStyles.screenTitle}>Figuras de Anime Disponibles</Text>

                {/* Barra de Búsqueda */}
                <TextInput
                    style={globalStyles.searchBar}
                    placeholder="Buscar figuras de anime..."
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {/* Lista de Productos */}
                <FlatList
                    data={filteredProducts}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    columnWrapperStyle={globalStyles.cardWrapper}
                    ListEmptyComponent={<Text style={globalStyles.emptyText}>No se encontraron figuras.</Text>}
                    // Añadimos padding a la lista
                    contentContainerStyle={globalStyles.listContentContainer}
                />
            </View>
        </View>
    );
}