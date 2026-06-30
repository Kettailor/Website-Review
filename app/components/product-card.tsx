"use client";

import { Product } from "../data/products";
import { useApp } from "./providers";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { lang, addToCart, toggleFavorite, isFavorite } = useApp();

  const formatCurrency = (value: number) => {
    return lang === "vi"
      ? `${value.toLocaleString("vi-VN")}đ`
      : `$${(value / 25000).toFixed(2)}`;
  };

  const isFav = isFavorite(product.id);

  return (
    <article className="product-card reveal">
      <div className="product-card-image-wrap">
        <img 
          src={product.image} 
          alt={lang === "vi" ? product.nameVi : product.nameEn} 
          className="product-card-image"
          loading="lazy"
        />
        <button
          type="button"
          className={`favorite-card-btn ${isFav ? "active" : ""}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFav}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill={isFav ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2.2" 
            width="20" 
            height="20"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title">{lang === "vi" ? product.nameVi : product.nameEn}</h3>
        <p className="product-card-desc">
          {lang === "vi" ? product.descriptionVi : product.descriptionEn}
        </p>
        <div className="product-card-footer">
          <span className="product-card-price">{formatCurrency(product.price)}</span>
          <div className="product-card-buttons">
            <button
              type="button"
              className="button button-secondary card-view-details-btn"
              onClick={() => onViewDetails(product)}
            >
              {lang === "vi" ? "Chi tiết" : "Details"}
            </button>
            <button
              type="button"
              className="button button-primary card-add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              {lang === "vi" ? "Thêm giỏ" : "+ Cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
