// context/StoreContext.tsx (CORREGIDO Y ESTABILIZADO)

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { CATEGORY_ANIME, INITIAL_PRODUCTS, INITIAL_RATE, INITIAL_USERS, ROLES, STORAGE_KEYS } from '../constants';

// Tipos para usuario, producto y carrito
export interface User {
    password: string;
    role: string;
    cart: CartItem[];
    email?: string;
}

export interface Users {
    [username: string]: User;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    priceUSD: number;
    category: string;
    image: string;
    stock: number;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface CartDetails {
    detailedCart: Array<{ product: Product; productId: string; quantity: number; subtotalUSD: number }>;
    totalUSD: number;
    totalBS: number;
    totalItems: number;
}

export interface StoreContextType {
    loading: boolean;
    currentUser: { username: string; role: string; email?: string } | null;
    products: Product[];
    cart: CartItem[];
    exchangeRate: number;
    setExchangeRate: (rate: number) => void;
    handleLogin: (username: string, password: string) => boolean;
    handleRegister: (username: string, password: string) => boolean;
    handleLogout: () => void;
    addToCart: (productId: string, quantity?: number) => void;
    updateCartItemQuantity: (productId: string, newQuantity: number) => void;
    getCartDetails: () => CartDetails;
    addProduct: (productData: Partial<Product>) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (id: string) => void;
    clearCart: () => void;
    getProductById: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
        const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<{ username: string; role: string; email?: string } | null>(null);
        const [users, setUsers] = useState<Users>(INITIAL_USERS);
        const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
        const [cart, setCart] = useState<CartItem[]>([]);
        const [exchangeRate, setExchangeRate] = useState<number>(INITIAL_RATE);

    // --- Persistencia (Cargar y Guardar Datos) ---
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
                // NOTA: Mantenemos el INITIAL_USERS original para compatibilidad
                setUsers(storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS); 

                const storedProducts = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
                setProducts(storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS);

                const storedRate = await AsyncStorage.getItem(STORAGE_KEYS.RATE);
                if (storedRate) setExchangeRate(parseFloat(storedRate));
            } catch (e) {
                console.error("Error cargando datos:", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEYS.RATE, exchangeRate.toString());
    }, [exchangeRate]);
    
    // Guardar el carrito en el usuario activo cuando cambia
    useEffect(() => {
        if (currentUser && currentUser.username) { // Aseguramos que haya un usuario
            setUsers(prevUsers => ({
                ...prevUsers,
                [currentUser.username]: { ...prevUsers[currentUser.username], cart: cart }
            }));
        }
    }, [cart, currentUser]);


    // --- GESTIÓN DE AUTENTICACIÓN (CORRECCIÓN CLAVE AQUÍ) ---

    const handleRegister = useCallback((username: string, password: string, email?: string): boolean => {
        if (users[username]) {
            Alert.alert('Error', 'El usuario ya existe.');
            return false;
        }
        if (username.length < 3 || password.length < 4) {
            Alert.alert('Error', 'Usuario o contraseña muy cortos.');
            return false;
        }
        // Aseguramos que el nuevo usuario se guarde con un objeto de carrito vacío para evitar fallos
        const newUsers = { ...users, [username]: { password, role: ROLES.CUSTOMER, cart: [], email } };
        setUsers(newUsers);
        Alert.alert('Éxito', 'Registro exitoso. ¡Inicia sesión!');
        return true;
    }, [users]);

    const handleLogin = useCallback((username: string, password: string): boolean => {
        const user = users[username];
        if (user && user.password === password) {
            setCurrentUser({ username, role: user.role, email: user.email });
            setCart(user.cart || []);
            return true;
        }
        Alert.alert('Error', 'Credenciales inválidas.');
        return false;
    }, [users]);

    const handleLogout = useCallback((): void => {
        setCurrentUser(null);
        setCart([]);
        // ❌ ELIMINAMOS setCurrentScreen('login');
    }, []);


    // --- GESTIÓN DEL CARRITO ---

    const getProductById = useCallback((id: string): Product | undefined => products.find(p => p.id === id), [products]);

    const addToCart = useCallback((productId: string, quantity: number = 1): void => {
        const product = getProductById(productId);
        const currentItemInCart = cart.find(item => item.productId === productId);
        const currentQuantity = currentItemInCart ? currentItemInCart.quantity : 0;
        
        if (!product || (product.stock && currentQuantity + quantity > product.stock)) {
            const stockLimit = product ? product.stock : 0;
            Alert.alert('Error', `Stock insuficiente o límite alcanzado. Stock disponible: ${stockLimit}.`);
            return;
        }

        setCart(prevCart => {
            const productInCart = prevCart.find(item => item.productId === productId);

            if (productInCart) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { productId, quantity }];
            }
        });
        Alert.alert('🛒 Carrito', '¡Producto añadido correctamente!');
    }, [getProductById, cart]); // Agregamos 'cart' para que el stock check funcione bien

    const updateCartItemQuantity = useCallback((productId: string, newQuantity: number): void => {
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.productId !== productId));
        } else {
            const product = getProductById(productId);
            if (product && product.stock && newQuantity > product.stock) {
                 Alert.alert('Error', `Stock máximo disponible: ${product.stock}`);
                 return;
            }
            setCart(prevCart => prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    }, [getProductById]);
    
    const clearCart = useCallback((): void => {
        setCart([]);
        Alert.alert('✅ Compra Finalizada', '¡Compra simulada realizada con éxito!');
    }, []);

    const getCartDetails = useCallback((): CartDetails => {
        let totalUSD = 0;
        let totalItems = 0;
        const detailedCart: Array<{ product: Product; productId: string; quantity: number; subtotalUSD: number }> = [];
        cart.forEach(item => {
            const product = getProductById(item.productId);
            if (product) {
                const subtotalUSD = product.priceUSD * item.quantity;
                totalUSD += subtotalUSD;
                totalItems += item.quantity;
                detailedCart.push({ product, productId: item.productId, quantity: item.quantity, subtotalUSD });
            }
        });
        const totalBS = totalUSD * exchangeRate;
        return { detailedCart, totalUSD, totalBS, totalItems };
    }, [cart, getProductById, exchangeRate]);


    // --- CRUD DE PRODUCTOS ---

    const addProduct = useCallback((productData: Partial<Product>): void => {
        const newProduct: Product = {
            id: Date.now().toString(),
            name: productData.name ?? '',
            description: productData.description ?? '',
            priceUSD: typeof productData.priceUSD === 'string' ? parseFloat(productData.priceUSD) : (productData.priceUSD ?? 0),
            category: CATEGORY_ANIME,
            image: productData.image ?? '',
            stock: typeof productData.stock === 'string' ? parseInt(productData.stock) : (productData.stock ?? 0),
        };
        setProducts(prevProducts => [...prevProducts, newProduct]);
        Alert.alert('✅ CRUD', '¡Figura agregada correctamente!');
    }, []);

    const updateProduct = useCallback((updatedProduct: Product): void => {
        setProducts(prevProducts => prevProducts.map(p =>
            p.id === updatedProduct.id
                ? {
                    ...updatedProduct,
                    priceUSD: typeof updatedProduct.priceUSD === 'string' ? parseFloat(updatedProduct.priceUSD) : updatedProduct.priceUSD,
                    category: CATEGORY_ANIME,
                    stock: typeof updatedProduct.stock === 'string' ? parseInt(updatedProduct.stock) : updatedProduct.stock,
                }
                : p
        ));
        Alert.alert('✅ CRUD', '¡Figura actualizada correctamente!');
    }, []);

    const deleteProduct = useCallback((id: string): void => {
        Alert.alert('Confirmar', '¿Seguro que deseas eliminar esta figura?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar', onPress: () => {
                    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
                    setCart(prevCart => prevCart.filter(item => item.productId !== id));
                    Alert.alert('🗑️ CRUD', '¡Figura eliminada correctamente!');
                }, style: 'destructive'
            },
        ]);
    }, []);


    // --- VALORES DEL CONTEXTO ---
    const contextValue: StoreContextType = {
        loading,
        // Eliminamos currentScreen
        currentUser,
        products,
        cart,
        exchangeRate,
        setExchangeRate,
        handleLogin,
        handleRegister,
        handleLogout,
        addToCart,
        updateCartItemQuantity,
        getCartDetails,
        addProduct,
        updateProduct,
        deleteProduct,
        clearCart,
        getProductById,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = (): StoreContextType => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore debe usarse dentro de StoreProvider');
    }
    return context;
};