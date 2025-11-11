import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MOCK_USERS } from "../data/users";

type LocationState = {
  from?: Location;
};

const QUICK_FACTS = [
  { label: "รายวิชา", value: "CSI205" },
  { label: "Session", value: "003" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleAccount = MOCK_USERS[0];

  const fromLocation = (location.state as LocationState | undefined)?.from;
  const redirectTarget = fromLocation
    ? `${fromLocation.pathname}${fromLocation.search}${fromLocation.hash}`
    : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTarget]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const id = username.trim();
    const pass = password.trim();

    if (!id || !pass) {
      setErrorMessage("กรุณากรอก Username และ Password");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const isValid = login({ username: id, password: pass });
    setIsSubmitting(false);

    if (!isValid) {
      setErrorMessage("Username หรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    setUsername("");
    setPassword("");
    navigate(redirectTarget, { replace: true });
  };

  const handleUseSample = () => {
    if (!sampleAccount) {
      return;
    }
    setUsername(sampleAccount.username);
    setPassword(sampleAccount.password);
    setErrorMessage("");
  };

  return (
    <section className="auth-page auth-page-ambient">
      <div className="auth-card auth-card-extended">
      

        <div className="auth-metadata">
          {QUICK_FACTS.map((fact) => (
            <div className="auth-metadata-item" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>

        {sampleAccount && (
          <div className="auth-sample">
            <div>
              <p className="auth-sample-label">simple account</p>
              <p className="auth-sample-value">
                {sampleAccount.username} / {sampleAccount.password}
              </p>
            </div>
            <button
              type="button"
              className="auth-ghost-btn"
              onClick={handleUseSample}
            >
              กรอกให้อัตโนมัติ
            </button>
          </div>
        )}

        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              placeholder="เช่น 67160165"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            รหัสผ่าน
            <input
              type="password"
              placeholder="••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
