import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Product, useStore } from '../context/StoreContext';
import { copyImageToLocal } from '../utils/imageUtils';


interface ProductFormProps {
  editProductData: Product | null;
  setModalVisible: (visible: boolean) => void;
}

type FormState = {
  name: string;
  description: string;
  priceUSD: string;
  image: string; 
  stock: string;
  imageUri?: string;
};

const initialFormState: FormState = {
  name: '',
  description: '',
  priceUSD: '',
  image: '📦',
  stock: '0',
  imageUri: undefined,
};


const ProductForm: React.FC<ProductFormProps> = ({ editProductData, setModalVisible }) => {
  const { addProduct, updateProduct } = useStore();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (editProductData) {
      setFormData({
        name: editProductData.name || '',
        description: editProductData.description || '',
        priceUSD: String(editProductData.priceUSD ?? ''),
        image: editProductData.image || '📦',
        stock: String(editProductData.stock ?? '0'),
        imageUri: editProductData.image || undefined,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editProductData]);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a tus imágenes.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedUri = result.assets[0].uri;
        const localUri = await copyImageToLocal(selectedUri);
        setFormData(prev => ({ ...prev, image: localUri, imageUri: localUri }));
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const handleFormSubmit = () => {
    const price = parseFloat(formData.priceUSD);
    const stock = parseInt(formData.stock, 10);

    if (!formData.name || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      Alert.alert('Error', 'Verifica nombre, precio (USD > 0) y stock (entero >= 0).');
      return;
    }

    setIsSaving(true);
    try {
      if (editProductData) {
      const updated: Product = {
        ...editProductData,
        name: formData.name,
        description: formData.description,
        priceUSD: price,
        image: formData.image,
        stock: stock,
      };
      updateProduct(updated);
    } else {
      addProduct({
        name: formData.name,
        description: formData.description,
        priceUSD: price,
        image: formData.image,
        stock: stock,
      });
    }

    setModalVisible(false);
    setFormData(initialFormState);
  } finally {
    setIsSaving(false);
  }
  };

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.field}>
        <Text style={localStyles.label}>Nombre</Text>
        <TextInput
          value={formData.name}
          onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
          placeholder="Nombre del producto"
          style={localStyles.input}
        />
      </View>

      <View style={localStyles.field}>
        <Text style={localStyles.label}>Descripción</Text>
        <TextInput
          value={formData.description}
          onChangeText={text => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Descripción"
          style={[localStyles.input, { height: 80 }]}
          multiline
        />
      </View>

      <View style={localStyles.row}>
        <View style={[localStyles.field, { flex: 1, marginRight: 8 }]}>
          <Text style={localStyles.label}>Precio (USD)</Text>
          <TextInput
            value={formData.priceUSD}
            onChangeText={text => setFormData(prev => ({ ...prev, priceUSD: text }))}
            placeholder="0.00"
            keyboardType="numeric"
            style={localStyles.input}
          />
        </View>

        <View style={[localStyles.field, { width: 100 }]}>
          <Text style={localStyles.label}>Stock</Text>
          <TextInput
            value={formData.stock}
            onChangeText={text => setFormData(prev => ({ ...prev, stock: text }))}
            placeholder="0"
            keyboardType="numeric"
            style={localStyles.input}
          />
        </View>
      </View>

      <View style={{ marginVertical: 10, alignItems: 'center' }}>
        <Button title="Seleccionar Imagen" onPress={pickImage} color="#007AFF" />

        {formData.image && (formData.imageUri || formData.image.startsWith('file://') || formData.image.startsWith('http')) ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>Vista previa:</Text>
            <View style={{ borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 8, overflow: 'hidden' }}>
              <Image
                source={{ uri: formData.image }}
                style={{ width: 120, height: 90, resizeMode: 'cover' }}
              />
            </View>
          </View>
        ) : formData.image && formData.image !== '📦' ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>Vista previa:</Text>
            <Image source={{ uri: formData.image }} style={{ width: 120, height: 90 }} />
          </View>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button title="Cancelar" color="#8E8E93" onPress={() => setModalVisible(false)} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title={editProductData ? 'Actualizar' : 'Agregar'} onPress={handleFormSubmit} color="#007AFF" />
        </View>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default ProductForm;
