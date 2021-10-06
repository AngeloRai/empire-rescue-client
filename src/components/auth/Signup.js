import React from "react";
import { api } from "../../apis";
import UserFormIput from "./UserFormIput";
import { Link, useHistory } from "react-router-dom";
function Signup() {
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await api.post("/sign-up", { ...values });
      history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-3">
      <h2 className="mt-3">Signup Info</h2>
      <hr />
      <UserFormIput handleSubmit={handleSubmit} />
      <div className="mt-4">
        <Link to="/login">Ja possui uma conta? Faça Login aqui!</Link>
      </div>
    </div>
  );
}

export default Signup;
