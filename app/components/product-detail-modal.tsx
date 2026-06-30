"use client";

import { useEffect, useState } from "react";
import { Product } from "../data/products";
import { useApp } from "./providers";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { lang, addToCart, toggleFavorite, isFavorite, addToRecentlyViewed } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(true);
      addToRecentlyViewed(product.id);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700); // 700ms skeleton loading simulation

      return () => clearTimeout(timer);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return lang === "vi"
      ? `${value.toLocaleString("vi-VN")}đ`
      : `$${(value / 25000).toFixed(2)}`;
  };

  const isFav = isFavorite(product.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details">
          &times;
        </button>

        {isLoading ? (
          // Skeleton Loading View
          <div className="skeleton-modal-body">
            <div className="skeleton-grid">
              <div className="skeleton-image-box skeleton-pulse"></div>
              <div className="skeleton-info-box">
                <div className="skeleton-line skeleton-title-line skeleton-pulse"></div>
                <div className="skeleton-line skeleton-price-line skeleton-pulse"></div>
                <div className="skeleton-line skeleton-desc-line skeleton-pulse"></div>
                <div className="skeleton-line skeleton-desc-line skeleton-pulse"></div>
                <div className="skeleton-line skeleton-desc-line skeleton-pulse"></div>
                <div className="skeleton-specs-group">
                  <div className="skeleton-line skeleton-spec-line skeleton-pulse"></div>
                  <div className="skeleton-line skeleton-spec-line skeleton-pulse"></div>
                  <div className="skeleton-line skeleton-spec-line skeleton-pulse"></div>
                </div>
                <div className="skeleton-actions">
                  <div className="skeleton-button skeleton-pulse"></div>
                  <div className="skeleton-button skeleton-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Actual Content View
          <div className="product-detail-body">
            <div className="product-detail-grid">
              <div className="product-image-section">
                <img src={product.image} alt={lang === "vi" ? product.nameVi : product.nameEn} />
              </div>
              <div className="product-info-section">
                <h2>{lang === "vi" ? product.nameVi : product.nameEn}</h2>
                <div className="product-detail-price">{formatCurrency(product.price)}</div>
                <p className="product-detail-desc">
                  {lang === "vi" ? product.descriptionVi : product.descriptionEn}
                </p>

                <div className="product-specs-card">
                  <h3>{lang === "vi" ? "Thông số chi tiết" : "Detailed specs"}</h3>
                  <dl className="specs-list">
                    {Object.entries(lang === "vi" ? product.specsVi : product.specsEn).map(([key, val]) => (
                      <div key={key} className="spec-item">
                        <dt>{key}:</dt>
                        <dd>{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="product-detail-actions">
                  <button 
                    type="button" 
                    className="button button-primary add-to-cart-large-btn"
                    onClick={handleAddToCart}
                  >
                    {lang === "vi" ? "Thêm vào giỏ hàng" : "Add to Cart"}
                  </button>
                  <button 
                    type="button" 
                    className={`button button-secondary wishlist-toggle-btn ${isFav ? "in-wishlist" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    {isFav 
                      ? (lang === "vi" ? " Đã lưu thích" : " Wishlisted") 
                      : (lang === "vi" ? " Yêu thích" : " Wishlist")
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
