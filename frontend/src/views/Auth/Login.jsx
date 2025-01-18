import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    if (username === "admin" && password === "admin") {
      login();
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <AuthLayout>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card shadow-lg p-5"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="card-title text-center mb-5">Admin Log-in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="name"
                id="name"
                name="name"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100 my-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
