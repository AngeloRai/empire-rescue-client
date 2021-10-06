import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";
import PatientAddress from "./PatientAddress";
import PatientContact from "./PatientContact";

import moment from "moment";
import { api } from "../../../apis";
import "./PatientDetails.css";

function PatientDetails() {
  const [patient, setPatient] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await api.get(`/patient/${id}`);
      setPatient(fetchedPatient.data);
      setLoading(false);
    };
    fetchPatient();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patient/${id}`);
      setShowModal(false);
      history.push("/pacientes");
    } catch (err) {
      console.console.error(err);
    }
  };

  return (
    <div className="main-patient-card">
      {patient && (
        <div>
          <div className="patient-name text-center">{patient.name}</div>
          <div className="patient-contact">
            <div className="row">
              <PatientContact patient={patient} />
              {patient?.address && <PatientAddress patient={patient} />}
            </div>
            <div className="specialty-patient row">
              <div className="row border col-10 col-md-10 appointment-box">
                <h4>Agendamentos:</h4>
                {!loading && patient.appointments ? (
                  patient.appointments.map((appointment) => (
                    <div className="col-6 col-md-5 col-lg-3 shadow border p-2 m-1">
                      <div>
                        <p>
                          <strong>Data/Horario: </strong>
                          {moment(appointment.dateTime)
                            .add(3, "hours")
                            .format("DD/MM/YYYY HH:mm")}
                        </p>{" "}
                        <p>
                          <strong>Tipo:</strong> {appointment.appointmentType}
                        </p>
                      </div>
                      <div>
                        {appointment.specialty && (
                          <p>
                            <strong>Especialidade:</strong>{" "}
                            {appointment.specialty.name}
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/agendamento-detalhes/${appointment.id}`}
                        key={appointment.id}
                        className="btn btn-secondary p-1"
                      >
                        Detalhes
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Nenhum agendamento encontrado</p>
                )}
              </div>
            </div>

            <div className="patient-edit-delete-box">
              <div className="patient-edit-delete">
                <Link to={`/editar-paciente/${id}`}>
                  {" "}
                  <MdModeEdit />
                </Link>
              </div>
              <div className="patient-edit-delete">
                <span type="button" onClick={() => setShowModal(true)}>
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
            <ConfirmationModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={() => handleDelete(id)}
              title={`Tem certeza de que deseja excluir este paciente?`}
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

export default PatientDetails;
