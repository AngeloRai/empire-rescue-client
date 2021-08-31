import React from 'react'
import Select from 'react-select'

function AppointmentFacility({ facilityOptions, setSelectedFacility, defaultValue }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
                <label htmlFor="registerFacility">
                  <h5>Estabelecimento</h5>
                </label>
                <Select
                  noOptionsMessage={() =>
                    "Nenhum estabelecimento econtrado com especialidade selecionada."
                  }
                  placeholder="selecione..."
                  defaultValue={defaultValue}
                  onChange={(item) => setSelectedFacility(Number(item.value))}
                  options={facilityOptions}
                  className="basic-multi-select field-box "
                  classNamePrefix="select"
                />
              </div>
  )
}

export default AppointmentFacility
