import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/currency";

export default function Cart() {
  const { items, removeFromCart, totalItems, totalPrice, clearCart } =
    useCart();

  const hasItems = items.length > 0;

  return (
    <div className="cart-page">

      {!hasItems ? (
        <div className="cart-empty card shadow-sm">
          <p>
            ยังไม่มีสินค้าในตะกร้า กดปุ่ม {`"Add to cart"`} ในหน้า
            Products เพื่อเริ่มต้น
          </p>
          <Link className="btn btn-primary btn-sm" to="/products">
            ไปที่หน้า Products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            {items.map((item) => (
              <article key={item.id} className="product-card shadow-sm">
                <div className="product-card-thumb">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    loading="lazy"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="product-card-body">
                  <h2 title={item.title}>{item.title}</h2>
                </div>
                <div className="product-card-footer">
                  <span className="product-price">
                    {formatCurrency(item.price)}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete from carts
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className="cart-summary card shadow-sm">
            <div className="cart-summary-info">
              <span className="cart-summary-label">Products:</span>
              <span className="cart-summary-count">{totalItems} items</span>
              <span className="cart-summary-label">Total price:</span>
              <span className="cart-summary-price">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="cart-summary-actions">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={clearCart}
              >
                Clear cart
              </button>
              <button type="button" className="btn btn-warning btn-sm">
                Checkout 💳
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
