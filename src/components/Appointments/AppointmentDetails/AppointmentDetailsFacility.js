import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";

function AppointmentDetailsFacility({ facility }) {
  // facility coming from ApointmentDetails as prop
  return (
    <div className="col-10 col-md-5 border p-2 m-2">
    <h3 className="text-center">Estabelecimento</h3>
      <div className="d-flex">
        <span>
          <h4>{facility.name} /&nbsp; </h4>
        </span>
        <span>
          <h6 className="text-secondary"> {facility.unit}</h6>
        </span>
      </div>
      <div>
        <h4 className="text-secondary">Contato:</h4>
        <span>
          <strong>
          <FaMobileAlt />&nbsp;&nbsp;
          </strong>
          {facility.phone1}
        </span>
        <span>
          <strong>
          &nbsp;&nbsp;<FaMobileAlt />&nbsp;&nbsp;
          </strong>
          {facility.phone2}
        </span>
        <span>
          <strong>
          &nbsp;&nbsp;<FaPhone />&nbsp;&nbsp;
          </strong>
          {facility.phone3}
        </span>
        <div>
          <span>
            <strong>
              <HiOutlineMail />
            </strong>
            &nbsp;&nbsp;
            {facility.email}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <span>
          <h5>
            <strong className="text-secondary">Cidade:</strong> &nbsp;
            <span>{facility.address.city}</span>
          </h5>
        </span>

        <span>
          <strong>Endereço: &nbsp;</strong>
          {facility.address.street}, {facility.address.number}&nbsp;&nbsp;
        </span>

        <span>
          <strong>Bairro:</strong> {facility.address.neighborhood}&nbsp;&nbsp;
        </span>

        {facility.address.complement && (
          <span>
            <strong>Complemento: </strong>
            {facility.address.complement}&nbsp;&nbsp;
          </span>
        )}

        {facility.address.observations && (
          <span>
            <strong>Observações: </strong>
            {facility.address.observations}
          </span>
        )}

      </div>
    </div>
  );
}

export default AppointmentDetailsFacility;
