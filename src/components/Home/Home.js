import React from "react";
import bombeiros from "../../images/bombeiros-450px.png";
import cruz from "../../images/cruz-de-viga-450px.png";
import medical from "../../images/empiremedical-450px.png";
import gh from "../../images/gestao-hospitalar-450px.png";

function Home() {
  return (
    <div className="w-100 h-100 row">
      <small>
        <strong className="m-3">demo user</strong> email: teste@teste.com
        password: teste123
      </small>
      <div className="row d-flex justify-content-center gap-3">
        <img className="col-7 col-md-2" src={bombeiros} alt="firefighter" />
        <img className="col-7 col-md-2" src={cruz} alt="cross" />
        <img className="col-7 col-md-2" src={medical} alt="medical" />
        <img className="col-7 col-md-2" src={gh} alt="mangement" />
      </div>
    </div>
  );
}

export default Home;
