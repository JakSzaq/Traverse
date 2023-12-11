import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name == "email") {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const data = await response.json();
      const token = data.token;
      console.log(token);
      alert("Login successful");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Unable to sign in", error);
    }
  };

  return (
    <div>
      <h2>LOGOWANIE</h2>
      <form onSubmit={handleSignIn}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignInPage;
