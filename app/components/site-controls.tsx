"use client";

import { useEffect, useState } from "react";
import { useApp } from "./providers";

type Theme = "light" | "dark";

export function SiteControls() {
  const { 
    lang: language, 
    setLang: setLanguage, 
    cart, 
    favorites, 
    setIsCartOpen 
  } = useApp();
  
  const [theme, setTheme] = useState<Theme>("light");
  
  const themeLabel =
    language === "vi" ? (theme === "light" ? "Tối" : "Sáng") : theme === "light" ? "Dark" : "Light";
  const themeAriaLabel =
    language === "vi"
      ? theme === "light"
        ? "Chuyển sang giao diện tối"
        : "Chuyển sang giao diện sáng"
      : theme === "light"
        ? "Switch to dark mode"
        : "Switch to light mode";

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ubpet-theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(savedTheme ?? preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("ubpet-theme", theme);
  }, [theme]);

  return (
    <div className="site-controls" aria-label="Display controls">
      {/* Wishlist Button */}
      <a 
        href="#products-section" 
        className="wishlist-header-btn" 
        aria-label={language === "vi" ? "Xem sản phẩm yêu thích" : "View favorites"}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {favoritesCount > 0 && <span className="controls-badge">{favoritesCount}</span>}
      </a>

      {/* Cart Button */}
      <button
        type="button"
        className="cart-header-btn"
        onClick={() => setIsCartOpen(true)}
        aria-label={language === "vi" ? "Mở giỏ hàng" : "Open shopping cart"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {cartItemsCount > 0 && <span className="controls-badge badge-mint">{cartItemsCount}</span>}
      </button>

      <div className="segmented-control" aria-label="Language">
        <button
          type="button"
          className={language === "vi" ? "active" : ""}
          onClick={() => setLanguage("vi")}
          aria-pressed={language === "vi"}
        >
          VI
        </button>
        <button
          type="button"
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
        >
          EN
        </button>
      </div>

      <button
        className="theme-toggle"
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={themeAriaLabel}
        aria-pressed={theme === "dark"}
      >
        {themeLabel}
      </button>
    </div>
  );
}

