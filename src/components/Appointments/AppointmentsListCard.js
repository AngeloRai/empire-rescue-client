import React from "react";
import { Link } from "react-router-dom";
import "./AppointmentListCard.css";
import { FaPhone } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

function AppointmentsListCard({ appointment, facility, patient }) {
  const colors = {
    exame: "#d1b3e6",
    consulta: "#d4f2a2",
    pendente: "danger",
    informado: "info",
    realizado: "succes",
    ausente: "secondary",
  };

  return (
    <div key={appointment.id} className="col-9 col-md-6 col-lg-4 border pb-3">
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
          {appointment.dateTime}
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

      {appointment?.doctor?.name && <div>
        <strong className="text-small">Medico: </strong>
        <span className="text-small">Dr(a). {appointment?.doctor?.name}</span>
        <div>
            <div className="text-small">
              <FaPhone className="phone-icon" />
              {appointment.doctor.phone1}
            </div>
          </div>
      </div>}

      <div className="row">
        <div>
          <strong className="text-small">Paciente: </strong>
          <span className="text-small">{patient.name}</span>
        </div>
        <div>
          <div>
            <div className="text-small">
              <FaPhone className="phone-icon" />
              {patient.phone1}
            </div>
          </div>
        </div>
        <div className="doctor-edit-delete">
              <Link to={`/editar-agendamento/${appointment.id}`}>
                <MdModeEdit />
              </Link>
            </div>
      </div>

      {/* <Link
        className="text-decoration-none"
        to={`/estabelecimento-detalhes/${appointment.id}`}
      >
          </Link> */}
    </div>
  );
}

export default AppointmentsListCard;
