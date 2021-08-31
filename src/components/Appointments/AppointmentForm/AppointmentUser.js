import React from 'react'
import Select from 'react-select'
import { IoAdd } from "react-icons/io5";

function AppointmentUser({ users, setSelectedUser, handleNewUserToggle }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
                <label htmlFor="registerUser">
                  <h5>Usuario</h5>
                </label>
                <h6 className="text-secondary">Selecione um usuario</h6>
                <Select
                  noOptionsMessage={() =>
                    "Ususario não cadastrado! Cadastre um novo Usuario"
                  }
                  isClearable={true}
                  placeholder="selecione..."
                  defaultValue={[]}
                  onChange={(item) => setSelectedUser(Number(item?.value))}
                  options={users}
                  className="basic-multi-select field-box "
                  classNamePrefix="select"
                />
                <div className="d-flex">
                  <h6 className="text-secondary">Cadestre novo usuario</h6>
                  <div onClick={() => handleNewUserToggle()}>
                    <IoAdd className="text-secondary plus-icon h4" />
                  </div>
                </div>
              </div>
  )
}

export default AppointmentUser
