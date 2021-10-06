import { useHistory, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserFormIput from "./UserFormIput";

import { api } from "../../apis";
import { AuthContext } from "../../contexts/authContext";

function Login() {
  // Consumindo nosso state global do Context. Temos acesso pois Login é um componente filho do AuthContextProvider no App.js
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();

  //Se o usuário já estiver logado, redireciona pra página inicial
  useEffect(() => {
    if (loggedInUser.user.email) {
      history.push("/");
    }
  }, [loggedInUser, history]);

  async function handleSubmit(values) {
    try {
      setError(null);
      const user = await api.post("/login", values);
      // Storing logged user data into Context (global state)
      setLoggedInUser({ ...user.data });
      console.log(user.data);

      console.log(values);
      console.log(user);
      // Persists logged user data into localStorage to make available even when closing browser
      localStorage.setItem("loggedInUser", JSON.stringify(user.data));
    } catch (err) {
      setError(err.response.data.msg);

      if (err.response && err.response.data) {
        console.log(err.response.data.mes); // some reason error message
      }

      console.error(err.response.data.msg);
    }
  }

  return (
    <div className="m-3">
      <h1>Login</h1>

      <UserFormIput handleSubmit={handleSubmit} error={error}/>
      <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre.</Link></p>

    </div>
  );
}

export default Login;
