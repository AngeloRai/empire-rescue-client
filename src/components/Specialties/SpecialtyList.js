import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import { convertToSlug } from "../componentHelpers/slugify";
import { api } from "../../apis";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import "./SpecialtyList.css";

function SpecialtyList() {
  const [specialties, setSpecialties] = useState();
  const [filteredSpecialties, setFilteredSpecialties] = useState();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchName, setSearchName] = useState();

  const fetchSpecialties = async () => {
    const fetchedSpecialties = await api.get("/specialties");

    const sortedSpecialties = fetchedSpecialties.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setSpecialties(sortedSpecialties);
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  useEffect(() => {
    function filterSpecialties() {
      let filteredArray = [];
      if (specialties) {
        filteredArray = [...specialties];
      }
      if (specialties && searchName) {
        filteredArray = specialties.filter((specialty) =>
          convertToSlug(specialty.name).includes(convertToSlug(searchName))
        );
      } else if (specialties) {
        filteredArray = [...specialties];
      }

      setFilteredSpecialties(filteredArray);
    }
    filterSpecialties();
  }, [specialties, searchName]);

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
      <h2 className=" text-center">Especialidades</h2>{" "}
      <div className="add-link ">
        <Link to="/adicionar-especialidade" className="link">
          Adicionar Especialidade
        </Link>
      </div>
      <div className="row">
        <div className=" col-8 col-md-5 col-lg-3 m-1">
          <input
            placeholder="specialidade..."
            type="text"
            className="m-1 form-control shadow-none no-border"
            id="searchName"
            name="searchName"
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
          />
        </div>
      </div>
      <div className="list-specialty-header py-1">
        <div className=" col-5">NOME</div>
      </div>
      <div className="row">
        {filteredSpecialties &&
          filteredSpecialties.map((loopedSpecialty) => (
            <div
              className="specialties-container row col-10 col-md-5 mx-2 bg-light border"
              key={loopedSpecialty.id}
            >
              <Link
                to={`especialidade/${loopedSpecialty.id}`}
                className="link-unstyled text-decoration-none text-dark col-8 "
              >
                {loopedSpecialty.name}
              </Link>

              <Link
                className="text-decoration-none text-dark col-2 col-md-1 text-center"
                to={`/editar-specialidade/${loopedSpecialty.id}`}
              >
                <MdModeEdit />
              </Link>

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
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default SpecialtyList;
