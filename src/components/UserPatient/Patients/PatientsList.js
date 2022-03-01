import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertToSlug } from "../../componentHelpers/slugify";
import { api } from "../../../apis";
import { MdModeEdit } from "react-icons/md";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";
import { FaRegTrashAlt } from "react-icons/fa";
import "./PatientList.css";
import PatientsFilter from "./PatientsFilter";

function PatientList() {
  const [patients, setPatients] = useState();
  const [showModal, setShowModal] = useState();
  const [deleteId, setDeleteId] = useState();
  const [searchName, setSearchName] = useState();
  const [searchPhone, setSearchPhone] = useState();
  const [searchEmail, setSearchEmail] = useState();
  const [filteredPatients, setFilteredPatients] = useState();

  const fetchPatients = async () => {
    const fetchedPatients = await api.get("/patients");

    const sortedPatients = fetchedPatients.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPatients(sortedPatients);
  };

  useEffect(() => {
    fetchPatients();
  }, [showModal]);

  const handleModalDeleteId = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patient/${id}`);
      setShowModal(false);
    } catch (err) {
      console.console.error(err);
    }
  };

  useEffect(() => {
    function filterpatients() {
      let filteredArray = [];
      if (patients) {
        filteredArray = [...patients];
      }
      if (patients && searchName) {
        filteredArray = patients.filter((patient) =>
          convertToSlug(patient.name).includes(convertToSlug(searchName))
        );
      } else if (patients) {
        filteredArray = [...patients];
      }

      if (patients && searchPhone) {
        filteredArray = patients.filter((patient) =>
          convertToSlug(patient.phone1).includes(convertToSlug(searchPhone))
        );
      }
      if (patients && searchEmail) {
        filteredArray = patients.filter((patient) =>
          convertToSlug(patient.user.email).includes(convertToSlug(searchEmail))
        );
      }
      setFilteredPatients(filteredArray);
    }
    filterpatients();
  }, [patients, searchName, searchPhone, searchEmail]);

  return (
    <div className="main-patients-container">
      <h2 className=" text-center">Pacientes</h2>{" "}
      <div className="add-link">
        <Link to="/adicionar-paciente" className="link">
          Adicionar Paciente
        </Link>
      </div>
      <PatientsFilter
        setSearchName={setSearchName}
        searchName={searchName}
        setSearchPhone={setSearchPhone}
        searchPhone={searchPhone}
        setSearchEmail={setSearchEmail}
        searchEmail={searchEmail}
      />
      <div className="list-patients-header row">
        <div className=" col-5 col-md-3">NOME</div>
        <div className=" col-5 col-md-3">CELULAR</div>
        <div className=" col-5 col-md-4">PERTENCE AO USUARIO</div>
        <div className=" col-2 col-md-1">EDITAR</div>
        <div className=" col-2 col-md-1">EXCLUIR</div>
      </div>
      {filteredPatients &&
        filteredPatients.map((loopedPatient) => (
          <div
            className="row border-bottom patients-container "
            key={loopedPatient.id}
          >
            <Link
              to={`/detalhes-paciente/${loopedPatient.id}`}
              className="link col-5 col-md-3"
            >
              {loopedPatient.name}
            </Link>
            <div className="col-7 col-md-3">{loopedPatient.phone1}</div>
            <div className="col-7 col-md-4">{loopedPatient.user.email}</div>
            <Link
              className="text-decoration-none text-dark col-2 col-md-1 text-center"
              to={`/editar-paciente/${loopedPatient.id}`}
            >
              <MdModeEdit />
            </Link>
            <div className="col-2 col-md-1 text-center">
              <span
                type="button"
                onClick={() => handleModalDeleteId(loopedPatient.id)}
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
        title={`Tem certeza de que deseja excluir este paciente?`}
      >
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default PatientList;
