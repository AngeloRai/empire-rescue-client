import React, { useState } from "react";
import { api } from "../../apis";
import { Link, useHistory } from "react-router-dom";
import UserFormIputSignup from "./UserFormIputSignup";

function Signup() {
  
  const history = useHistory();
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    try {
      setError(null);
      await api.post("/sign-up", { ...values });
      console.log(values);
      history.push("/login");
    } catch (err) {

      console.error(err.response.data.msg);
      setError(err.response.data.msg);

      if (err) {
        console.log(err.response); // some reason error message
      }
    }
  };

  return (
    <div className="m-3">
      <h2 className="mt-3">Crie sua conta</h2>
      <hr />
      <UserFormIputSignup handleSubmit={handleSubmit} error={error}/>
      <div className="mt-4">
        <Link to="/login">Ja possui uma conta? Faça Login aqui!</Link>
      </div>
    </div>
  );
}

export default Signup;
