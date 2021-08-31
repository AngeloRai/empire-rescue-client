import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  const routes = [
    {
      path: "/agendamentos",
      exact: true,
      sidebar: () => <h6 className="text-white text-center">Agendamentos</h6>,
    },
    {
      path: "/medicos",
      exact: true,
      sidebar: () => <h6 className="text-white text-center">Medicos</h6>,
    },
    {
      path: "/estabelecimentos",
      exact: true,
      sidebar: () => (
        <h6 className="text-white text-center">Estabelecimentos</h6>
      ),
    },
    {
      path: "/especialidades",
      exact: true,
      sidebar: () => <h6 className="text-white text-center">Especialidades</h6>,
    },
    {
      path: "/exames",
      exact: true,
      sidebar: () => <h6 className="text-white text-center">Exames</h6>,
    },
  ];
  return (
    <div className="side-bar-container">
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar />}
          />
        ))}
      </Switch>

      <ul
        style={{ listStyleType: "none", padding: 0 }}
        className="side-bar-list"
      >
        <li>
          <Link to="/agendamentos">Agendamentos</Link>
        </li>
        <li>
          <Link to="/estabelecimentos">Estabelecimentos</Link>
        </li>
        <li>
          <Link to="/medicos">Medicos</Link>
        </li>
        <li>
          <Link to="/especialidades">Especialidades</Link>
        </li>
        <li>
          <Link to="/exames">Exames</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
