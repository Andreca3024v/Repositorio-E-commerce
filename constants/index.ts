// constants/index.ts

export const STORAGE_KEYS = {
    USERS: '@ecommerce_users',
    PRODUCTS: '@ecommerce_products',
    RATE: '@ecommerce_rate',
};

export const ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
};

// NUEVA CONSTANTE AGREGADA
export const APP_NAME = "Zenith Collectibles";

export const INITIAL_RATE = 36.0;

export const CATEGORY_ANIME = 'Figuras de Anime';
export const CATEGORIES = [CATEGORY_ANIME];

// Usuario ADMIN inicial: adminUser / adminpassword
export const INITIAL_USERS = {
    'adminUser': { password: 'adminpassword', role: ROLES.ADMIN, cart: [] },
    'testUser': { password: 'password', role: ROLES.CUSTOMER, cart: [] },
};

export const INITIAL_PRODUCTS = [
    { id: 'p1', name: 'Goku Super Saiyan (Bandai)', description: 'Figura articulada de alta calidad de Dragon Ball.', priceUSD: 45.99, category: CATEGORY_ANIME, image: '💥', stock: 10 },
    { id: 'p2', name: 'Nezuko Kamado (Escala 1/8)', description: 'Estatua detallada de Demon Slayer.', priceUSD: 95.50, category: CATEGORY_ANIME, image: '🌸', stock: 5 },
    { id: 'p3', name: 'Luffy Gear 5 (POP UP PARADE)', description: 'Edición especial de One Piece.', priceUSD: 65.00, category: CATEGORY_ANIME, image: '🏴‍☠️', stock: 12 },
    { id: 'p4', name: 'Levi Ackerman (Figma)', description: 'Figura con accesorios y múltiples poses.', priceUSD: 80.00, category: CATEGORY_ANIME, image: '⚔️', stock: 8 },
];