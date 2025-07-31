import React, { createContext, useContext, useState, ReactNode } from 'react';
import images from '../assets/images';

export type ImageKey = keyof typeof images;

export type Product = {
  name: string;
  price: number;
  calories: string;
  rating: number;
  reviews: number;
  weight: number;
  image: ImageKey;
  description: string;
};

export type CartItem = Product & { id: string };

type ProductContextType = {
  product: Product;
  cart: CartItem[];
  setSelectedProduct: (product: any) => void;
  incrementWeight: (id?: string) => void;
  decrementWeight: (id?: string) => void;
  totalPrice: string;
  addToCart: () => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; // Add clearCart function
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<Product>({
    name: 'Bell Pepper Red',
    price: 4.99,
    calories: '100 Calories',
    rating: 4.8,
    reviews: 203,
    weight: 5,
    image: 'pepper',
    description:
      'Bell peppers are sweet, crisp vegetables full of antioxidants and vitamin C. The red variety offers a rich flavor, perfect for salads, stir-fries, and roasting.',
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  const setSelectedProduct = (selected: any) => {
    setProduct({
      name: selected.title,
      price: parseFloat(selected.price.replace('$', '')),
      calories: selected.calories,
      rating: selected.rating,
      reviews: selected.reviews,
      weight: 1,
      image: selected.imgKey,
      description: selected.description,
    });
  };

  const incrementWeight = (id?: string) => {
    if (id) {
      // Modify weight in cart
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, weight: item.weight + 1 } : item
        )
      );
    } else {
      // Modify weight in product detail
      setProduct((prev) => ({ ...prev, weight: prev.weight + 1 }));
    }
  };

  const decrementWeight = (id?: string) => {
    if (id) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id && item.weight > 1
            ? { ...item, weight: item.weight - 1 }
            : item
        )
      );
    } else {
      setProduct((prev) => ({
        ...prev,
        weight: prev.weight > 1 ? prev.weight - 1 : 1,
      }));
    }
  };

  const totalPrice = (product.price * product.weight).toFixed(2);

  const addToCart = () => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.name === product.name && item.image === product.image
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex].weight += product.weight;
        return updatedCart;
      }

      const id = `${product.name}-${Date.now()}`;
      const newItem: CartItem = { ...product, id };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]); // Clears the cart
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        cart,
        setSelectedProduct,
        incrementWeight,
        decrementWeight,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart, // Expose clearCart function
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
