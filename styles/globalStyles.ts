// styles/globalStyles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // --- Global Container Styles ---
    screenContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 20,
        textAlign: 'center',
    },
    headerLogoContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    storeHeader: {
        fontSize: 20,
        fontWeight: '900',
        color: '#5856D6', 
        marginLeft: 10,
    },
    input: {
        height: 50,
        borderColor: '#D1D1D6',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#8E8E93',
        fontSize: 16,
    },

    // --- Auth Styles ---
    authContainer: {
        justifyContent: 'flex-start',
        paddingTop: 40, 
        paddingHorizontal: 30, 
    },
    // Logo más grande (280x280)
    logo: {
        width: 280, 
        height: 280, 
        alignSelf: 'center',
        marginBottom: 10,
    },
    smallLogo: {
        width: 40,
        height: 40,
    },
    authTitle: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 30, 
        textAlign: 'center',
        color: '#FF9500',
    },
    authButtons: {
        marginTop: 20,
        height: 100,
        justifyContent: 'space-between',
        paddingBottom: 30, 
    },

    // --- Product CRUD List & Rate Styles ---
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    productEmoji: {
        fontSize: 30,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#5856D6',
    },
    crudButtons: {
        flexDirection: 'row',
    },
    addButton: {
        backgroundColor: '#FF9500',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 15, 
        marginBottom: 15,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFD9E6',
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    rateLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF3B30',
    },
    rateInput: {
        width: 100,
        height: 40,
        borderColor: '#FF3B30',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: 'right',
        backgroundColor: '#fff',
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#3C3C43',
    },
    categoryDisplay: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#E6F0FF',
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },

    // --- Home Screen Card Styles ---
    searchBar: {
        height: 45,
        borderColor: '#D1D1D6',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
        marginHorizontal: 15,
    },
    listContentContainer: {
        paddingHorizontal: 10,
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        maxWidth: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    cardWrapper: {
        justifyContent: 'space-between',
    },
    cardEmoji: {
        fontSize: 40,
        marginBottom: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 16,
    },
    cardDesc: {
        fontSize: 12,
        color: '#8E8E93',
        textAlign: 'center',
        marginBottom: 5,
    },
    cardPrice: {
        fontWeight: 'bold',
        color: '#5856D6',
        marginBottom: 10,
    },
    addToCartButton: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    addToCartButtonDisabled: {
        backgroundColor: '#8E8E93',
    },
    addToCartText: {
        color: 'white',
        marginRight: 5,
        fontWeight: 'bold',
    },
    stockWarning: {
        fontSize: 12,
        color: '#FF9500',
        marginTop: 5,
        fontWeight: 'bold',
    },
    
    // --- Cart Styles ---
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    cartItemText: {
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
    cartControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    cartQuantity: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    cartPrice: {
        fontWeight: 'bold',
        color: '#5856D6',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        marginHorizontal: 15,
    },
    totalFinal: {
        backgroundColor: '#D9FFD9',
        borderRadius: 8,
        marginTop: 10,
        padding: 15,
        borderBottomWidth: 0,
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 16,
        color: '#3C3C43',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalLabelFinal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    totalValueFinal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34C759',
    },

    // --- Profile Styles ---
    profileCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    profileLabel: {
        fontSize: 14,
        color: '#8E8E93',
    },
    profileValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#1C1C1C',
    },

    // --- Navigation Bar Styles (from app/index.tsx) ---
    navButton: {
        alignItems: 'center',
        paddingTop: 5,
        flex: 1,
    },
    navLabel: {
        fontSize: 10,
        marginTop: 3,
    },

    // --- Modal Styles (Usado en CRUD) ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FF9500',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    // --- FAB (Floating Action Button) Style (Usado en CRUD) ---
    fabButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 110, // Ajustado para estar por encima del Navbar
        backgroundColor: '#007AFF',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    // styles/globalStyles.ts (AGREGAR ESTOS ESTILOS AL FINAL)

    // --- Management/CRUD Styles ---
    fabButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 110, // Elevado para no tapar la barra de navegación
        backgroundColor: '#34C759', // Verde para agregar
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    crudButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // styles/globalStyles.ts (AGREGAR ESTOS ESTILOS)

    // --- Modal Styles para CRUD ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FF9500',
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#3C3C43',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});