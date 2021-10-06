import React from 'react'
import Select from 'react-select'

function AppointmentSpecialty({ setSelectedSpecialty, specialtyOptions, specialty }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
    <label htmlFor="registerSpecailty">
      <h5>Especialidade</h5>
    </label>
    <Select
     isClearable={true}
      placeholder="selecione..."
      defaultValue={specialty}
      onChange={(item) => setSelectedSpecialty(item?.value ? Number(item?.value) : null)}
      options={specialtyOptions}
      className="basic-multi-select field-box "
      classNamePrefix="select"
    />
  </div>
  )
}

export default AppointmentSpecialty
