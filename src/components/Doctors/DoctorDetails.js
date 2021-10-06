import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { useParams, useHistory } from "react-router";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import ListAssociations from "../componentHelpers/ListAssociations";
import { api } from "../../apis";
import "./DoctorDetails.css";

function DoctorDetails() {
  const [doctor, setDoctor] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      const fetchedDoctor = await api.get(`/doctor/${id}`);
      setDoctor(fetchedDoctor.data);
      console.log(fetchedDoctor.data);
      setLoading(false);
    };
    fetchDoctor();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/appointment-delete/${id}`);
      setShowModal(false);
      history.push("/agendamentos");
    } catch (err) {
      console.console.error(err);
    }
  };
  
  return (
    <div className="main-doctor-card">
      {doctor && (
        <div>
          <div className="doctor-name text-center">Dr.(a) {doctor.name}</div>
          <div className="doctor-contact">

            <div className="doctor-contatct-box">
              <div className="doctor-contact-list">
                <span>
                  <strong>
                    <FaMobileAlt />{" "}
                  </strong>{" "}
                  <span>{doctor.phone1}</span>
                </span>
                <span>
                  <strong>
                    <FaPhone />{" "}
                  </strong>{" "}
                  <span> {doctor.phone2}</span>
                </span>
              </div>
              
              <div className="doctor-contact-list">
                <div>
                  <strong>
                    <HiOutlineMail />{" "}
                  </strong>{" "}
                  <span> {doctor.email}</span>
                </div>
                <div>
                  <strong>Status: </strong>{" "}
                  <span>
                    {" "}
                    {doctor.isActive === true ? (
                      <span className="text-success">Ativo</span>
                    ) : (
                      <span className="text-danger">Inativo</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

          </div>
          <div className="specialty-facility row">
            {!loading && doctor.specialties?.length ? (
              <ListAssociations
                title={"Especialidades:"}
                items={doctor.specialties}
                link={"especialidade"}
                unit={false}
              />
            ) : (
              <div className="col-8 col-md-5 doc-spec-fac">
                <h4>Especialidades:</h4>Nenhuma especialidade encontrada.
              </div>
            )}
            {!loading && doctor.facilities?.length ? (
              <ListAssociations
                title={"Estabelecimentos:"}
                items={doctor.facilities}
                link={"estabelecimento-detalhes"}
                unit={true}
              />
            ) : (
              <div className="col-8 col-md-5 doc-spec-fac">
                <h4>Estabelecimentos:</h4>Nenhum estabelecimento encontrado.
              </div>
            )}
          <div className="row col-8 col-md-10 appointment-box border">
            <h4>Agendamentos:</h4>
            {!loading && doctor.appointments?.length ? (
              doctor.appointments.map((appointment) => (
                <div
                  className="col-5 m-1 shadow border p-2"
                  key={appointment.id}
                >
                  <div>
                    <p>
                      <strong>Data/Horario: </strong>
                      {appointment.dateTime}
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
                    to={`/agendamento/${appointment.id}`}
                    key={appointment.id}
                    className="link "
                  ></Link>
                </div>
              ))
            ) : (
              <p>Nenhum agendamento encontrado</p>
            )}
          </div>
          </div>

          <div className="doctor-edit-delete-box">
            <div className="doctor-edit-delete">
              <Link to={`/medico-editar/${id}`}>
                {" "}
                <MdModeEdit />
              </Link>
            </div>
            <div className="doctor-edit-delete">
              <span type="button" onClick={() => setShowModal(true)}>
                <FaRegTrashAlt />
              </span>
            </div>
          </div>
          <ConfirmationModal
            show={showModal}
            handleClose={() => setShowModal(0)}
            handleConfirm={() => handleDelete(id)}
            title={`Tem certeza de que deseja excluir este medico??`}
          >
            <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
          </ConfirmationModal>
        </div>
      )}
    </div>
  );
}

export default DoctorDetails;
