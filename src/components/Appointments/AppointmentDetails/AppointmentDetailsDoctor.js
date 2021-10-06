import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";

function AppointmentDetailsDoctor({ doctor }) {
  // doctor coming from ApointmentDetails as prop
  return (
    <div className="col-10 col-md-5 border p-2 m-2">
    <h3 className="text-center">Medico</h3>
      <div className="d-flex">
        <span>
          <h4>DR(a).&nbsp;{doctor.name} /&nbsp; </h4>
        </span>
        <span>
          <h6 className="text-secondary">CRM: {doctor.crm}</h6>
        </span>
      </div>
      <div>
        <h4 className="text-secondary">Contato:</h4>
        <span>
          <strong>
          <FaMobileAlt />&nbsp;&nbsp;
          </strong>
          {doctor.phone1}
        </span>
        <span>
          <strong>
          &nbsp;&nbsp;<FaPhone />&nbsp;&nbsp;
          </strong>
          {doctor.phone2}
        </span>
        <div>
          <span>
            <strong>
              <HiOutlineMail />
            </strong>
            &nbsp;&nbsp;
            {doctor.email}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsDoctor;
