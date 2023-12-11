import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name == "email") {
      setEmail(e.currentTarget.value);
    } else if (e.currentTarget.name == "name") {
      setName(e.currentTarget.value);
    } else if (e.currentTarget.name == "passwordConf") {
      setPasswordConf(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConf,
      }),
    });
    const data = await response.json();
    if (data.status == "fail" || data.status == "error") {
      alert(data.message);
    } else {
      alert("Account created successfully");
      setEmail("");
      setName("");
      setPassword("");
      navigate("/signin");
    }
  };

  return (
    <div>
      <h2>REJESTRACJA</h2>
      <form onSubmit={handleSignUp}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <input
          name="passwordConf"
          type="password"
          placeholder="powtórz hasło"
          value={passwordConf}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUpPage;
