import React from "react";
import { Link } from "react-router-dom";
import "./AppointmentListCard.css";
import { FaPhone } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import moment from 'moment'


function AppointmentsListCard({
  appointment,
  facility,
  patient,
  setShowModalDelete,
}) {


  const colors = {
    exame: "#d1b3e6",
    consulta: "#d1b045",
    pendente: "danger",
    informado: "info",
    realizado: "success",
    ausente: "secondary",
  };

  return (
    <div
      key={appointment.id}
      className="col-9 col-md-6 col-lg-4 col-xl-3 d-flex-column align-content-around mb-2"
    >
      <div className="p-2 border shadow-sm appointment-card">
        <div className="row">
          <span
            className="text-upper-strong d-flex justify-content-center align-items-center  col-5 "
            style={{
              backgroundColor: `${colors[appointment.appointmentType]}`,
            }}
          >
            {appointment.appointmentType}
          </span>
          <span
            className={`text-white bg-${
              colors[appointment.status]
            } col-7 text-upper-strong d-flex justify-content-center align-items-center `}
          >
            {appointment.status}
          </span>
        </div>

        <div>
          <strong className="text-small">Date e Horário: </strong>
          <span className="text-dark text-upper-strong">

            {moment(appointment.dateTime).add(3, 'hours').format('DD/MM/YYYY HH:mm')}
            
          </span>
        </div>
        <div>
          <span className="text-small">
            <strong>Tipo: </strong>
          </span>
          {appointment.appointmentType === "exame" && (
            <span className="text-small"> {appointment?.exam?.examName}</span>
          )}
          {appointment.appointmentType === "consulta" && (
            <span className="text-small">{appointment?.specialty?.name}</span>
          )}
        </div>

        <div>
          <span className="text-small">
            <strong>Local: </strong>
            {facility.name} / {facility.unit} ,
          </span>
          <small>{facility.address.city}</small>
          <div className="text-small">
            <FaPhone className="phone-icon" />
            {facility.phone1}
          </div>
        </div>

        {appointment.doctor && appointment?.doctor?.name && (
          <div>
            <strong className="text-small">Medico: </strong>
            <span className="text-small">
              Dr(a). {appointment?.doctor?.name}
            </span>
            <div>
              <div className="text-small">
                <FaPhone className="phone-icon" />
                {appointment.doctor.phone1}
              </div>
            </div>
          </div>
        )}

        {patient && <div className="row">
          <div>
            <strong className="text-small">Paciente: </strong>
            <span className="text-small">{patient.name}</span>
          </div>
          <div>
            <span className="text-small">
              <FaPhone className="phone-icon" />
              {patient.phone1}
            </span>

            {/* <Link
          className="text-decoration-none"
          to={`/estabelecimento-detalhes/${appointment.id}`}
        >
            </Link> */}
          </div>
        </div>}
      </div>
      <span className="d-flex justify-content-end gap-4">
        <Link to={`/agendamento-detalhes/${appointment.id}`}>
          <CgDetailsMore />
        </Link>
        <Link to={`/editar-agendamento/${appointment.id}`}>
          <MdModeEdit />
        </Link>
        <span type="button" onClick={() => setShowModalDelete(appointment.id)}>
          <FaRegTrashAlt />
        </span>
      </span>
    </div>
  );
}

export default AppointmentsListCard;
