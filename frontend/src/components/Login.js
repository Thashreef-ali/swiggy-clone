import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import home icon

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        const userId = data.user._id;
        const userRes = await fetch(`http://localhost:4000/api/user/${userId}`);
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.error);

        localStorage.setItem("user", JSON.stringify(userData.user));
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User ID:", user?._id);
        localStorage.setItem("islogin", "true");

        alert("Login successful!");
        navigate("/");
      } else {
        const response = await fetch("http://localhost:4000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Signup failed");

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("islogin", "true");

        alert("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      {/* Home Icon */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          fontSize: "24px",
          color: "orange",
        }}
        onClick={() => navigate("/")}
      >
        <FaHome />
      </div>

      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
          or {isLogin ? "create an account" : "login"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <button type="submit">{isLogin ? "LOGIN" : "SIGN UP"}</button>
        </form>

        <p className="terms">
          By clicking on {isLogin ? "Login" : "Sign Up"}, I accept the{" "}
          <strong>Terms & Conditions & Privacy Policy</strong>
        </p>
      </div>
    </div>
  );
};

export default Auth;
