
import { useEffect, useState } from 'react';
import { db } from '../data/GuitarDB';


export const useCart = () => {

    const initialCart = () => {
        // Obtenemos el carrito guardado en el localStorage.
        const localStorageCart = localStorage.getItem('cart');

        // Si hay un carrito en el localStorage, lo devuelve, sino devuelve un array vacío.
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const AddToCart = (guitar) => {
        // Buscamos la existencia de la guitarra por id y que no se repita
        const existingItem = cart.find(g => g.id === guitar.id);

        // Si el item ya está en el carrito, incrementamos la cantidad,
        if (existingItem) {
            const updateCart = cart.map(g => g.id === guitar.id ? { ...g, quantity: g.quantity + 1 } : g);
            setCart(updateCart);

            // sino, agregamos el nuevo item al carrito con una cantidad.
        } else {
            setCart([...cart, { ...guitar, quantity: 1 }]);
        }
    };


    const removeFromCart = (id) => {
        const deleteCart = cart.filter(g => g.id !== id);
        setCart(deleteCart);
    };


    const incrementQuantity = (id) => {
        // Buscamos el item en el carrito por id y incrementamos la cantidad.
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < 5) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })
        setCart(updateCart);
    };

    const decrementQuantity = (id) => {
        // Buscamos el item en el carrito por id y decrementamos la cantidad.
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item;
        })
        setCart(updateCart);
    };

    const ClearCart = (e) => {
        setCart([]);
    };

    return {
        data,
        cart,
        ClearCart,
        AddToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
    };
};

