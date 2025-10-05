// screens/AuthScreen.tsx

import React, { useState } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { useStore } from '../context/StoreContext';
import { styles as globalStyles } from '../styles/globalStyles';

const LOGO_IMAGE = require('../assets/zenith_logo.png');

export default function AuthScreen() {
  const { handleLogin, handleRegister } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!username || !password) {
        Alert.alert('Error', 'Por favor, introduce usuario y contraseña.');
        return;
    }
    
    if (isRegister) {
      if (handleRegister(username, password)) {
        setIsRegister(false);
        setUsername('');
        setPassword('');
      }
    } else {
      handleLogin(username, password);
    }
  };

  return (
    <KeyboardAvoidingView 
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50} 
    >
        <ScrollView 
            contentContainerStyle={globalStyles.authContainer} 
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <Image source={LOGO_IMAGE} style={globalStyles.logo} resizeMode="contain" />
            
            
            
            <Text style={globalStyles.authTitle}>{isRegister ? 'Registro de Nuevo Usuario' : 'Inicio de Sesión'}</Text>
            
            <TextInput
                style={globalStyles.input}
                placeholder="Nombre de Usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <View style={globalStyles.authButtons}>
                <Button title={isRegister ? 'Registrar' : 'Ingresar'} onPress={handleSubmit} color="#007AFF" />
                <Button
                    title={isRegister ? 'Ya tengo cuenta (Login)' : 'Crear cuenta (Registro)'}
                    onPress={() => setIsRegister(!isRegister)}
                    color="#34C759"
                />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}
