import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router'
import "./SideBar.css";

function SideBar() {

const urlLength = window.location.href.split('/').length
const slug = window.location.href.split('/')[urlLength - 1]

  return (
    <div className="side-bar-container">
       <ul
        style={{ listStyleType: "none", padding: 0 }}
        className="side-bar-list"
      >
        <Link to="/agendamentos">
          <li
            className={"link-selected"}
            
            >
            Agendamentos
          </li>
        </Link>
        <Link to="/gerar-agendamento">
          <li
            className={"link-selected"}
          >
            Novo Agendamento
          </li>
        </Link>
        <Link to="/estabelecimentos">
          <li
            className={"link-selected"}
            
          >
            Estabelecimentos
          </li>
        </Link>
        <Link to="/medicos">
          <li
            className={"link-selected"}
          >
            Medicos
          </li>
        </Link>
        <Link to="/pacientes">
          <li
            className={"link-selected"}
          >
            Pacientes
          </li>
        </Link>
        <Link to="/usuarios">
          <li
            className={"link-selected"}
          >
            Usuarios
          </li>
        </Link>
        <Link to="/especialidades">
          <li
            className={"link-selected"}
          >
            Especialidades
          </li>
        </Link>
        <Link to="/exames">
          <li
            className={"link-selected"}
          >
            Exames
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;

// {/* <Switch>
//         {routes.map((route, index) => (
//           <Route
//             key={index}
//             path={route.path}
//             exact={route.exact}
//             children={<route.sidebar />}
//           />
//         ))}
//       </Switch> */}


        // const routes = [
  //   {
  //     path: "/agendamentos",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Agendamentos</h6>,
  //   },
  //   {
  //     path: "/gerar-agendamento",
  //     exact: true,
  //     sidebar: () => (
  //       <h6 className="text-white text-center">Novo Agendamento</h6>
  //     ),
  //   },
  //   {
  //     path: "/medicos",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Medicos</h6>,
  //   },
  //   {
  //     path: "/pacientes",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Pacientes</h6>,
  //   },
  //   {
  //     path: "/usuarios",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Usuarios</h6>,
  //   },
  //   {
  //     path: "/estabelecimentos",
  //     exact: true,
  //     sidebar: () => (
  //       <h6 className="text-white text-center">Estabelecimentos</h6>
  //     ),
  //   },
  //   {
  //     path: "/especialidades",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Especialidades</h6>,
  //   },
  //   {
  //     path: "/exames",
  //     exact: true,
  //     sidebar: () => <h6 className="text-white text-center">Exames</h6>,
  //   },
  // ];