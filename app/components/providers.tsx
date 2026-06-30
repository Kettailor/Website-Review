"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, PRODUCTS } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ToastType = "info" | "success" | "error" | "behavior";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface AppContextType {
  // Language
  lang: "vi" | "en";
  setLang: (lang: "vi" | "en") => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Favorites
  favorites: string[]; // product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[]; // product IDs
  addToRecentlyViewed: (productId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<"vi" | "en">("vi");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize language state with document element
  const setLang = useCallback((newLang: "vi" | "en") => {
    setLangState(newLang);
    document.documentElement.dataset.lang = newLang;
    document.documentElement.lang = newLang;
    window.localStorage.setItem("ubpet-language", newLang);
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ubpet-language") as "vi" | "en" | null;
    const preferredLanguage = navigator.language.toLowerCase().startsWith("en") ? "en" : "vi";
    setLang(savedLanguage ?? preferredLanguage);

    const savedCart = window.localStorage.getItem("ubpet-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }

    const savedFavorites = window.localStorage.getItem("ubpet-favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error parsing favorites", e);
      }
    }

    const savedRecent = window.localStorage.getItem("ubpet-recently-viewed");
    if (savedRecent) {
      try {
        setRecentlyViewed(JSON.parse(savedRecent));
      } catch (e) {
        console.error("Error parsing recently viewed", e);
      }
    }
  }, [setLang]);

  // Sync state helpers to localStorage
  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    window.localStorage.setItem("ubpet-cart", JSON.stringify(newCart));
  };

  const syncFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    window.localStorage.setItem("ubpet-favorites", JSON.stringify(newFavs));
  };

  const syncRecentlyViewed = (newRecent: string[]) => {
    setRecentlyViewed(newRecent);
    window.localStorage.setItem("ubpet-recently-viewed", JSON.stringify(newRecent));
  };

  // Toast Management
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info", duration = 3500) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  // Cart actions
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      let newCart = [...prevCart];

      if (existingItemIndex > -1) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
      } else {
        newCart.push({ product, quantity });
      }

      syncCart(newCart);
      return newCart;
    });

    const msgVi = `Đã thêm "${product.nameVi}" vào giỏ hàng!`;
    const msgEn = `Added "${product.nameEn}" to cart!`;
    addToast(lang === "vi" ? msgVi : msgEn, "success");
  }, [addToast, lang]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.product.id === productId)?.product;
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      syncCart(newCart);

      if (product) {
        const msgVi = `Đã xóa "${product.nameVi}" khỏi giỏ hàng.`;
        const msgEn = `Removed "${product.nameEn}" from cart.`;
        addToast(lang === "vi" ? msgVi : msgEn, "info");
      }
      return newCart;
    });
  }, [addToast, lang]);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      syncCart(newCart);
      return newCart;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    syncCart([]);
    addToast(lang === "vi" ? "Đã xóa toàn bộ giỏ hàng." : "Cleared all cart items.", "info");
  }, [addToast, lang]);

  // Favorites actions
  const toggleFavorite = useCallback((productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setFavorites((prevFavs) => {
      let newFavs: string[];
      let isAdded = false;

      if (prevFavs.includes(productId)) {
        newFavs = prevFavs.filter((id) => id !== productId);
      } else {
        newFavs = [...prevFavs, productId];
        isAdded = true;
      }

      syncFavorites(newFavs);

      const msgVi = isAdded
        ? `Đã lưu "${product.nameVi}" vào danh sách yêu thích!`
        : `Đã bỏ lưu "${product.nameVi}".`;
      const msgEn = isAdded
        ? `Added "${product.nameEn}" to wishlist!`
        : `Removed "${product.nameEn}" from wishlist.`;
      addToast(lang === "vi" ? msgVi : msgEn, "success");

      return newFavs;
    });
  }, [addToast, lang]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.includes(productId);
  }, [favorites]);

  // Recently viewed actions
  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const newRecent = [productId, ...filtered].slice(0, 5); // keep last 5
      syncRecentlyViewed(newRecent);
      return newRecent;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        addToRecentlyViewed,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
