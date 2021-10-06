import React from "react";

function FacilityAddress({ facility }) {
  return (
    <div className="facility-contatct-box col-md-12 col-lg-7 border p-2">
      <div className=" row">
        <span className=" col-md-12 ">
          <span className="p-2">
            <strong>Endereço: </strong> &nbsp;
            {facility.address.street} , {facility.address.number}
          </span>
        </span>

        <div className=" col-md-12 ">
          <span className="p-2">
            <strong>Bairro:</strong>{" "}
            <span> &nbsp; {facility.address.neighborhood}</span>
          </span>

          <span className="p-2">
            <strong>Cidade:</strong>{" "}
            <span> &nbsp; {facility.address.city}</span>
          </span>

          <span className="p-2">
            <strong>Estado:</strong>{" "}
            <span> &nbsp; {facility.address.state}</span>
          </span>
        </div>
      </div>

      <div className="col-md-12 row">
        <span className=" col-12 ">
          {facility.address.complement && (
            <span className="p-2">
              <strong>Complemento: </strong> &nbsp;
              {facility.address.complement}
            </span>
          )}
        </span>
        <span className=" col-12 ">
          {facility.address.observations && (
            <span className="p-2">
              <strong>Observações:</strong> &nbsp;
              {facility.address.observations}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default FacilityAddress;
