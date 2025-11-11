import { NavLink } from "react-router-dom";
import { PRODUCT_COUNT } from "../data/products";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

type NavItem = {
  path: string;
  label: string;
  end?: boolean;
  variant?: "primary" | "outline";
  badge?: number;
};

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", end: true },
  { path: "/calc", label: "Calculator" },
  { path: "/anim", label: "Animation" },
  { path: "/comp", label: "Component" },
  { path: "/todo", label: "Todo" },
];

export default function NavBar() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const items: NavItem[] = [
    ...NAV_ITEMS,
    {
      path: "/products",
      label: `Products (${PRODUCT_COUNT})`,
      variant: "primary",
    },
    {
      path: "/cart",
      label: "Carts",
      variant: "outline",
      badge: totalItems,
    },
  ];

  return (
    <nav className="container nav">
      <div className="nav-items">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => {
              const classes = ["nav-link"];
              if (item.variant === "primary") {
                classes.push("nav-pill", "nav-pill-primary");
              } else if (item.variant === "outline") {
                classes.push("nav-pill", "nav-pill-outline");
              }
              if (isActive) {
                classes.push("active");
              }
              return classes.join(" ");
            }}
          >
            <span>{item.label}</span>
            {typeof item.badge === "number" && (
              <span
                className={`nav-badge ${
                  item.badge > 0 ? "nav-badge-visible" : ""
                }`}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="nav-auth">
        {isAuthenticated ? (
          <>
            <span className="nav-user">
              <span className="nav-user-label">ยินดีต้อนรับ</span>
              <strong>{user?.fullName ?? user?.username}</strong>
            </span>
            <button
              type="button"
              className="nav-logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              [
                "nav-login-link",
                "nav-link",
                "nav-pill",
                "nav-pill-primary",
                isActive ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
