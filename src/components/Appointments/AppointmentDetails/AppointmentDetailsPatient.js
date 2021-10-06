import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";

function AppointmentDetailsPatient({ patient }) {
  // patient coming from ApointmentDetails as prop
  return (
    <div className="col-10 col-md-5 border p-2 m-2">
    <h3 className="text-center">Paciente</h3>
      <div className="d-flex">
        <span>
          <h4>{patient.name} </h4>
        </span>
      </div>
      <div>
        <h4 className="text-secondary">Contato:</h4>
        <span>
          <strong>
          <FaMobileAlt />&nbsp;&nbsp;
          </strong>
          {patient.phone1}
        </span>
       
        {patient.phone2 && <span>
          <strong>
          &nbsp;&nbsp;<FaPhone />&nbsp;&nbsp;
          </strong>
          {patient.phone2}
        </span>}
        <div>
          {patient.user.email && <span>
            <strong>
              <HiOutlineMail />
            </strong>
            &nbsp;&nbsp;
            {patient.user.email}
          </span>}
        </div>
      </div>

      <div className="mt-3">
        <span>
          <h5>
            <strong className="text-secondary">Cidade:</strong> &nbsp;
            <span>{patient.address.city}</span>
          </h5>
        </span>

        <span>
          <strong>Endereço: &nbsp;</strong>
          {patient.address.street}, {patient.address.number}&nbsp;&nbsp;
        </span>

        <span>
          <strong>Bairro:</strong> {patient.address.neighborhood}&nbsp;&nbsp;
        </span>

        {patient.address.complement && (
          <span>
            <strong>Complemento: </strong>
            {patient.address.complement}&nbsp;&nbsp;
          </span>
        )}

        {patient.address.observations && (
          <span>
            <strong>Observações: </strong>
            {patient.address.observations}
          </span>
        )}
        
      </div>
    </div>
  );
}

export default AppointmentDetailsPatient;
