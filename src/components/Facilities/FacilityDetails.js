import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import FacilityAddress from "./FacilityAddress";
import FacilityContact from "./FacilityContact";
import ListAssociations from "../componentHelpers/ListAssociations";
import moment from "moment";
import { api } from "../../apis";
import "./FacilityDetails.css";

function FacilityDetails() {
  const [facility, setFacility] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFacility = async () => {
      const fetchedFacility = await api.get(`/facility/${id}`);
      setFacility(fetchedFacility.data);
      setLoading(false);
    };
    fetchFacility();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/facility-delete/${id}`);
      setShowModal(false);
      history.push("/estabelecimentos");
    } catch (err) {
      console.console.error(err);
    }
  };

  return (
    <div className="main-facility-card">
      {facility && (
        <div>
          <div className="facility-name text-center">
            {facility.name}
            <small className="text-secondary h5"> / ({facility.unit})</small>
          </div>
          <div className="text-center m-1">
            {facility.emergency === true ? (
              <span className="badge bg-danger text-white details-badgets-fixed-height-c">
                PRONTO ATENDIMENTO
              </span>
            ) : null}
            {facility.clinic === true ? (
              <span className="badge bg-primary text-white details-badgets-fixed-height-c">
                CONSULTÓRIO
              </span>
            ) : null}
            {facility.hospital === true ? (
              <span className="badge bg-success text-white details-badgets-fixed-height-c">
                HOSPITAL
              </span>
            ) : null}
            {facility.laboratory === true ? (
              <span className="badge bg-info text-white details-badgets-fixed-height-c">
                LAB
              </span>
            ) : null}
          </div>
          <div className="facility-contact">
            <div className="row">
              <FacilityContact facility={facility} />

              {facility?.address && <FacilityAddress facility={facility} />}
            </div>
            <div className="specialty-facility row">
              {!loading && facility.specialties?.length ? (
                <ListAssociations
                  title={"Especialidades:"}
                  items={facility.specialties}
                  link="especialidade"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Especialidades:</h4>Nenhuma especialidade encontrada.
                </div>
              )}
              {!loading && facility.exams?.length ? (
                <ListAssociations
                  title={"Exames:"}
                  items={facility.exams}
                  exam={true}
                  link="medico-detalhes"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Exames:</h4>Nenhum exame encontrado.
                </div>
              )}
              {!loading && facility.doctors?.length ? (
                <ListAssociations
                  title={"Medicos:"}
                  items={facility.doctors}
                  link="medico-detalhes"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Medicos:</h4>Nenhum medico encontrado.
                </div>
              )}
              <div className="row border col-10 col-md-10 appointment-box">
                <h4>Agendamentos:</h4>
                {!loading && facility.appointments ? (
                  facility.appointments.map((appointment) => (
                    <div className="col-6 col-md-5 col-lg-3 shadow border p-2">
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
                        <p>
                          <strong>Local:</strong> {appointment.facility.name}
                        </p>{" "}
                        <p>
                          <strong>Unidade:</strong> {appointment.facility.unit}
                        </p>
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

            <div className="facility-edit-delete-box">
              <div className="facility-edit-delete">
                <Link to={`/estabelecimento-editar/${id}`}>
                  {" "}
                  <MdModeEdit />
                </Link>
              </div>
              <div className="facility-edit-delete">
                <span type="button" onClick={() => setShowModal(true)}>
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
            <ConfirmationModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={() => handleDelete(id)}
              title={`Tem certeza de que deseja excluir este estabelecimento?`}
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

export default FacilityDetails;
