import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import moment from "moment";
import { api } from "../../../apis";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import AppointmentDetailsFacility from "./AppointmentDetailsFacility";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";
import "./AppointmentDetails.css";
import AppointmentDetailsPatient from "./AppointmentDetailsPatient";
import AppointmentDetailsDoctor from "./AppointmentDetailsDoctor";
import AppointmentDetailsExam from "./AppointmentDetailsExam";

function AppointmentDetails() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState();
  const { id } = useParams();

  const colors = {
    exame: "#d1b3e6",
    consulta: "#d1b045",
    pendente: "danger",
    informado: "info",
    realizado: "success",
    ausente: "secondary",
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      const fetchedAppointment = await api.get(`appointment/${id}`);
      setAppointment(fetchedAppointment.data);

    };
    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/appointment-delete/${id}`);
      setShowModal(false);
      history.push("/agendamentos");
    } catch (err) {
      console.console.error(err);
    }
  };


  return (
    <div className="m-1 row">
      <div className="appointment-edit-delete-box">
        <div className="appointment-edit-delete">
          <Link to={`/editar-agendamento/${id}`}>
            {" "}
            <MdModeEdit />
          </Link>
        </div>
        <div className="appointment-edit-delete">
          <span type="button" onClick={() => setShowModal(true)}>
            <FaRegTrashAlt />
          </span>
        </div>
      </div>
      <h3 className=" text-center">Detalhes do Agendamento</h3>
      {appointment && (
        <div className="mb-2 ">
          <div className="d-flex justify-content-center gap-4">
            <span
              className="text-upper d-flex justify-content-center align-items-center px-4 py-1"
              style={{
                backgroundColor: `${colors[appointment.appointmentType]}`,
              }}
            >
              Tipo:&nbsp; {appointment.appointmentType}
            </span>
            <span
              className={`text-white bg-${
                colors[appointment.status]
              }  text-upper d-flex justify-content-center align-items-center px-4 py-1`}
            >
              Status:&nbsp; {appointment.status}
            </span>
          </div>

          {appointment.appointmentType === "consulta" && (
            <span>
              <h5 className="m-3 text-center">
                <span className="text-secondary">Especialidade:</span>{" "}
                {appointment.specialty.name}
              </h5>
            </span>
          )}
          <span className="text-dark text-upper-strong">
            <h5 className="text-center">
              <span className="text-secondary">Agendado para: </span>
              {moment(appointment.dateTime)
                .add(3, "hours")
                .format("DD/MM/YYYY HH:mm")}
            </h5>
          </span>
        </div>
      )}
      {appointment && (
        <div className="row">
          <AppointmentDetailsFacility facility={appointment.facility} />

          <AppointmentDetailsPatient patient={appointment.patient} />

          {appointment.doctor && (
            <AppointmentDetailsDoctor doctor={appointment.doctor} />
          )}
          {appointment.exam && (
            <AppointmentDetailsExam exam={appointment.exam} />
          )}
        </div>
      )}

      <div className="appointment-edit-delete-box">
        <div className="appointment-edit-delete">
          <Link to={`/editar-agendamento/${id}`}>
            {" "}
            <MdModeEdit />
          </Link>
        </div>
        <div className="appointment-edit-delete">
          <span type="button" onClick={() => setShowModal(true)}>
            <FaRegTrashAlt />
          </span>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(0)}
        handleConfirm={() => handleDelete()}
        title={`Tem certeza de que deseja excluir este agendamento??`}
      >
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default AppointmentDetails;
