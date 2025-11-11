import { PRODUCTS } from "../data/products";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/currency";

export default function Products() {
  const { addToCart, isInCart } = useCart();

  return (
    <div className="products-page">
      {/* <section className="card products-hero shadow-sm">
        <div>
          <h1 className="products-title">Products catalog</h1>
          <p className="products-subtitle">
            เลือกชมสินค้าที่ชอบ แล้วกด {`"Add to cart"`} เพื่อนำไปชำระเงินในภายหลัง
          </p>
        </div>
        <div className="products-meta">
          <div>
            <span className="products-meta-label">Available</span>
            <span className="products-meta-value">{PRODUCT_COUNT}</span>
          </div>
          <div>
            <span className="products-meta-label">In cart</span>
            <span className="products-meta-value products-meta-value-accent">
              {totalItems}
            </span>
          </div>
        </div>
      </section> */}

      <div className="products-grid-scrollable">
        {PRODUCTS.map((product) => {
          const inCart = isInCart(product.id);
          return (
            <article
              key={product.id}
              className={`product-card shadow-sm ${
                inCart ? "product-card-added" : ""
              }`}
            >
              <div className="product-card-thumb">
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  loading="lazy"
                  width={150}
                  height={150}
                />
              </div>
              <div className="product-card-body">
                <h2 title={product.title}>{product.title}</h2>
                <p className="product-card-caption">
                  Album #{product.albumId}
                </p>
              </div>
              <div className="product-card-footer">
                <span className="product-price">
                  {formatCurrency(product.price)}
                </span>
                <button
                  type="button"
                  disabled={inCart}
                  className={`btn btn-sm ${
                    inCart ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={() => {
                    if (!inCart) {
                      addToCart(product);
                    }
                  }}
                >
                  {inCart ? "added to carts" : "Add to cart"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
