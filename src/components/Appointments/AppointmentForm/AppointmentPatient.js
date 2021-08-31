import React from 'react'
import Select from 'react-select'
import { IoAdd } from "react-icons/io5";

function AppointmentPatient({selectedUser, setSelectedPatient, patients, handleToggleNewPatient, showMessage, patient}) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
                <label htmlFor="registerPatient">
                  <h5>Paciente</h5>
                </label>
                <h6 className="text-secondary">Selecione um paciente</h6>
                <Select
                  defaultValue={patient}
                  isDisabled={!selectedUser}
                  noOptionsMessage={() =>
                    "Paciente não cadastrado! Cadastre um novo Paciente"
                  }
                  isClearable={true}
                  placeholder={
                    !selectedUser
                      ? "selecione um usuario antes..."
                      : "selecione um paciente"
                  }
                  defaultValue={patient}
                  onChange={(item) => setSelectedPatient(Number(item?.value))}
                  options={patients}
                  className="basic-multi-select field-box "
                  classNamePrefix="select"
                />
                <div className="d-flex">
                  <h6 className="text-secondary">Cadestre novo paciente</h6>
                  <div type="button" onClick={() => handleToggleNewPatient()}>
                    <IoAdd className="text-secondary plus-icon h4" />
                  </div>
                </div>
                {showMessage && !selectedUser ? (
                  <div className="is-invalid text-danger">
                    Selecione um usuario!
                  </div>
                ) : null}
              </div>
  )
}

export default AppointmentPatient
