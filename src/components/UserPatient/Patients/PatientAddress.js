import React from "react";

function PatientAddress({ patient }) {
  return (
    <div className="patient-contatct-box col-md-12 col-lg-7 border p-2">
      <div className=" row">
        <span className=" col-md-12 ">
          <span className="p-2">
            <strong>Endereço: </strong> &nbsp;
            {patient.address.street} , {patient.address.number}
          </span>
          <span className="p-2">
            <strong>Bairro:</strong>{" "}
            <span> &nbsp; {patient.address.neighborhood}</span>
          </span>
        </span>

        <div className=" col-md-12 ">

          <span className="p-2">
            <strong>Cidade:</strong>{" "}
            <span> &nbsp; {patient.address.city}</span>
          </span>

          <span className="p-2">
            <strong>Estado:</strong>{" "}
            <span> &nbsp; {patient.address.state}</span>
          </span>
          <span className="p-2">
            <strong>CEP:</strong>{" "}
            <span> &nbsp; {patient.address.postalCode}</span>
          </span>
        </div>
      </div>

      <div className="col-md-12 row">
        <span className=" col-12 ">
          {patient.address.complement && (
            <span className="p-2">
              <strong>Complemento: </strong> &nbsp;
              {patient.address.complement}
            </span>
          )}
        </span>
        <span className=" col-12 ">
          {patient.address.observations && (
            <span className="p-2">
              <strong>Observações:</strong> &nbsp;
              {patient.address.observations}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default PatientAddress;
