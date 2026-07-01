"use client";

import { useApp } from "./providers";

export function CartDrawer() {
  const { 
    lang, 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    addToast
  } = useApp();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const formatCurrency = (value: number) => {
    return lang === "vi"
      ? `${value.toLocaleString("vi-VN")}đ`
      : `$${(value / 25000).toFixed(2)}`; // Mock USD conversion
  };

  const handleCheckout = () => {
    const msgVi = "Cảm ơn bạn đã mua hàng! Hệ thống sẽ xử lý đơn hàng.";
    const msgEn = "Thank you for your purchase! Processing order.";
    addToast(lang === "vi" ? msgVi : msgEn, "success", 4000);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="cart-header">
          <h2>
            {lang === "vi" ? "Giỏ Hàng" : "Shopping Cart"}
            <span className="cart-badge-count">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
          </h2>
          <button 
            type="button" 
            className="cart-close-btn" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            &times;
          </button>
        </header>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>{lang === "vi" ? "Giỏ hàng của bạn đang trống" : "Your cart is empty"}</p>
              <button 
                type="button" 
                className="button button-primary" 
                onClick={() => setIsCartOpen(false)}
              >
                {lang === "vi" ? "Tiếp tục xem" : "Keep browsing"}
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {cart.map((item) => (
                <li key={item.product.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <h4>{lang === "vi" ? item.product.nameVi : item.product.nameEn}</h4>
                    <p className="cart-item-price">{formatCurrency(item.product.price)}</p>
                    <div className="cart-item-controls">
                      <div className="quantity-selector">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        {lang === "vi" ? "Xóa" : "Remove"}
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total-col">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <footer className="cart-footer">
            <div className="cart-summary-row">
              <span>{lang === "vi" ? "Tổng cộng:" : "Subtotal:"}</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
            <p className="cart-note">
              {lang === "vi" 
                ? "Dữ liệu được lưu trữ cục bộ để phục vụ mục đích review demo." 
                : "Stored locally for demo and review simulation."}
            </p>
            <div className="cart-actions-row">
              <button 
                type="button" 
                className="button button-secondary"
                onClick={clearCart}
              >
                {lang === "vi" ? "Xóa hết" : "Clear all"}
              </button>
              <button 
                type="button" 
                className="button button-primary checkout-btn"
                onClick={handleCheckout}
              >
                {lang === "vi" ? "Thanh toán" : "Checkout"}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
