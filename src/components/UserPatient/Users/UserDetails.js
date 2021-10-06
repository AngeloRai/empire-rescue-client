import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";

import { api } from "../../../apis";
import "./UserDetails.css";

function UserDetails() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedUser = await api.get(`/user/${id}`);
      setUser(fetchedUser.data);
      setLoading(false);
    };
    fetchPatient();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user-delete/${id}`);
      setShowModal(false);
      history.push("/usuarios");
    } catch (err) {
      console.console.error(err);
    }
  };

  return (
    <div className="main-user-card">
      {user && (
        <div>
          <div className="user-name text-center">{user.email}</div>
          <p>
            Este cadastro tem privilégio{" "}
            {user.role === "ADMIN" ? (
              <strong>"administrador"</strong>
            ) : (
              <strong>"usuário"</strong>
            )}{" "}
          </p>
          <div className="user-contact">
            <div className="row border col-12 col-md-12">
              <h4>Pacientes:</h4>
              {!loading && user.patients.length ? (
                user.patients.map((patient) => (
                  <div className="col-6 col-lg-4 shadow border p-2 m-1">
                    <div>
                      <p>
                        <strong>Nome Paciente:</strong> {patient.name}
                      </p>
                      <p>
                        <strong>Celular:</strong> {patient.phone1}
                      </p>
                    </div>

                    <Link
                      to={`/detalhes-paciente/${patient.id}`}
                      key={patient.id}
                      className="btn btn-secondary p-1"
                    >
                      Detalhes
                    </Link>
                  </div>
                ))
              ) : (
                <p>Usuário não tem paciente registrado</p>
              )}
            </div>

            <div className="user-edit-delete-box">
              <div className="user-edit-delete">
                <Link to={`/editar-paciente/${id}`}>
                  {" "}
                  <MdModeEdit />
                </Link>
              </div>
              <div className="user-edit-delete">
                <span type="button" onClick={() => setShowModal(true)}>
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
            <ConfirmationModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={() => handleDelete(id)}
              title={`Tem certeza de que deseja excluir este usuario?`}
            >
              <p>
                Esta ação é irreversível! Clique em "Confirmar" para excluir.
              </p>
            </ConfirmationModal>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
