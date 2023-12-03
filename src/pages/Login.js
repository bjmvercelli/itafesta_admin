import React, { useState } from "react";

import "../theme/login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function LoginPage() {
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!loginData.login || !loginData.password) {
      alert("Preencha todos os campos!");
      return;
    }

    if (loginData.login === "admin" && loginData.password === "admin") {
      alert("Login efetuado com sucesso!");
      localStorage.setItem("login", loginData.login);
      history.push("/dashboard");
    } else {
      alert("Login ou senha incorretos!");
    }
    
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="splitdiv" id="leftdiv">
        <div id="leftdivcard">
          <h1 style={{ paddingTop: "20px", textAlign: "center" }}>Admin</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Login"
              onChange={handleInputChange}
              value={loginData.login}
              name="login"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={handleInputChange}
              value={loginData.password}
              name="password"
              required
            />

            <div style={{ textAlign: "center" }}>
              <button type="submit" id="leftbutton" className="ripple2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="splitdiv" id="rightdiv"></div>
    </div>
  );
}
