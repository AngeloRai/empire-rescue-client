import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import { api } from "../../apis";
import { FaRegTrashAlt } from "react-icons/fa";
import "./SpecialtyList.css";

function SpecialtyList() {
  const [specialties, setSpecialties] = useState();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const fetchSpecialties = async () => {
    const fetchedSpecialties = await api.get("/specialties");

    const sortedSpecialties = fetchedSpecialties.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log(sortedSpecialties);
    setSpecialties(sortedSpecialties);
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/specialty-delete/${id}`);
      fetchSpecialties();
      setShowModal(false);
    } catch (err) {
      console.console.error(err);
    }
  };

  const handleModalDeleteId = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <div className="main-specialties-container">
      <h2>Especialidades</h2>{" "}
      <div className="add-link ">
        <Link to="/adicionar-especialidade" className="link">
          Adicionar Especialidade
        </Link>
      </div>
      <div className="list-specialty-header py-1">
        <div className=" col-5">NOME</div>
      </div>
      <div className="row">
        {specialties &&
          specialties.map((loopedSpecialty) => (
            <div
              className="specialties-container row col-5 mx-2 bg-light border"
              key={loopedSpecialty.id}
            >
              <div className="col-9 mx-1">
                <Link
                  to={`especialidade/${loopedSpecialty.id}`}
                  className="link-unstyled text-decoration-none text-dark"
                >
                  {loopedSpecialty.name}
                </Link>
              </div>
  
              <div className="col-2 text-end">
                <span
                  type="button"
                  onClick={() => handleModalDeleteId(loopedSpecialty.id)}
                >
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
          ))}
      </div>
            <ConfirmationModal
              show={showModal}
              handleClose={() => setShowModal(0)}
              handleConfirm={() => handleDelete(deleteId)}
              title={`Tem certeza de que deseja excluir?`}
            >
              <p>
                Esta ação é irreversível! Clique em "Confirmar" para excluir.
              </p>
            </ConfirmationModal>
    </div>
  );
}

export default SpecialtyList;
