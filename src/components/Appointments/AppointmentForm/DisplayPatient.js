import React from "react";

function DisplayPatient({ displaySelectedPatient }) {
  return (
   <div>
     {displaySelectedPatient.length && <div className="row m-3">
      
         <div className="col-8 col-md-4 m-1 border p-2">
          <h5 className="text-secondary">Dados Paciente</h5>
          <div>
            <strong>Nome: </strong> {displaySelectedPatient[0].name}
          </div>
          <div>
            <strong>Celular: </strong> {displaySelectedPatient[0].phone1}
          </div>
          <div>
            <strong>Telefone: </strong> {displaySelectedPatient[0].phone2}
          </div>
          <div>
            <strong>RG: </strong> {displaySelectedPatient[0].rg}
          </div>
          <div>
            <strong>CPF: </strong> {displaySelectedPatient[0].cpf}
          </div>
        </div> <div className="col-8 col-md-4 m-1 border p-2">
          <h5 className="text-secondary">Endereço</h5>
          <div>
            {displaySelectedPatient[0].address.street},&nbsp;{" "}
            {displaySelectedPatient[0].address.number}
          </div>
          <div>
            <strong>Bairro: &nbsp;</strong>{" "}
            {displaySelectedPatient[0].address.neighborhood}&nbsp;
            <strong>&nbsp;Cidade: &nbsp;</strong> {displaySelectedPatient[0].address.city}
            <strong>&nbsp; Estado: &nbsp;</strong> {displaySelectedPatient[0].address.state}
          </div>
          <div>
            <strong>Complemento: </strong>{" "}
            {displaySelectedPatient[0].address.complement}
          </div>
          <div>
            <strong>Observações: </strong>{" "}
            {displaySelectedPatient[0].address.observations}
          </div>
        </div>
      </div>}
   </div>
  );
}

export default DisplayPatient;
