import { createContext, useState, useEffect } from "react";
import { cartService } from "../services/cart";

export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    addToCart: () => null,
    removeFromCart: () => null,
    isInCart: () => false,
    refreshCart: () => null,
    clearCart: () => null,
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const refreshCart = async () => {
        try {
            const response = await cartService.getAll();
            setCartItems(response.data);
            const countResponse = await cartService.getCount();
            setCartCount(countResponse.data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    };

    const addToCart = async (id) => {
        try {
            await cartService.add(id);
            await refreshCart();
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await cartService.remove(id);
            await refreshCart();
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    const isInCart = async (id) => {
        try {
            const response = await cartService.exists(id);
            return response.data;
        } catch (error) {
            console.error('Failed to check if item exists in cart:', error);
            return false;
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clear();
            await refreshCart();
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    const value = { cartItems, cartCount, addToCart, removeFromCart, isInCart, refreshCart, clearCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
