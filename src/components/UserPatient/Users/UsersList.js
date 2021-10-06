import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { convertToSlug } from "../../componentHelpers/slugify";
import { api } from "../../../apis";
import { MdModeEdit } from "react-icons/md";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";
import { FaRegTrashAlt } from "react-icons/fa";
import "./UsersList.css";

function UsersList() {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchusers = async () => {
    const fetchedUsers = await api.get("/users");

    const sortedUsers = fetchedUsers.data.sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    console.log(sortedUsers);
    setUsers(sortedUsers);
  };

  useEffect(() => {
    fetchusers();
  }, [showModal]);

  const handleModalDeleteId = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user-delete/${id}`);
      setShowModal(false);
      history.push('/usuarios')

    } catch (err) {
      console.console.error(err);
    }
  };

  useEffect(() => {
    function filterusers() {
      let filteredArray = [];
      if (users) {
        filteredArray = [...users];
      }
      if (users && searchEmail) {
        filteredArray = users.filter((user) =>
          convertToSlug(user.email).includes(convertToSlug(searchEmail))
        );
      }
      setFilteredUsers(filteredArray);
    }
    filterusers();
  }, [users, searchEmail]);

  return (
    <div className="main-users-container">
      <h2 className=" text-center">Usuarios</h2>{" "}
      <div className="add-link">
        <Link to="/adicionar-usuario" className="link">
          Adicionar Usuario
        </Link>
      </div>
      <div className="col-md-5 col-lg-3 m-1">
        <input
          placeholder="email usuario..."
          type="text"
          className="m-1 form-control shadow-none no-border "
          id="searchEmail"
          name="searchEmail"
          onChange={(e) => setSearchEmail(e.target.value)}
          value={searchEmail}
        />
      </div>
      <div className="list-users-header row">
        <div className=" col-7 col-md-5">EMAIL</div>
        <div className=" col-2 ">FUNÇÃO</div>
      </div>

      {filteredUsers &&
        filteredUsers.map((loopedUser) => (
          <div
            className="row border-bottom users-container "
            key={loopedUser.id}
          >
            <Link
              to={`/detalhes-usuario/${loopedUser.id}`}
              className="link col-7 col-md-5"
            >
              {loopedUser.email}
            </Link>
            <div className="col-2">
            {loopedUser.role}
            </div>
            <Link
              className="text-decoration-none text-dark col-2 col-md-1 text-center"
              to={`/editar-usuario/${loopedUser.id}`}
            >
              <MdModeEdit />
            </Link>
            <div className="col-2 col-md-1 text-center">
              <span
                type="button"
                onClick={() => handleModalDeleteId(loopedUser.id)}
              >
                <FaRegTrashAlt />
              </span>
            </div>
          </div>
        ))}
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(0)}
        handleConfirm={() => handleDelete(deleteId)}
        title={`Tem certeza de que deseja excluir este usuario?`}
      >
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default UsersList;
