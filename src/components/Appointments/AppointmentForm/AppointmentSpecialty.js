import React from 'react'
import Select from 'react-select'

function AppointmentSpecialty({ setSelectedSpecialty, specialtyOptions }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
    <label htmlFor="registerSpecailty">
      <h5>Especialidade</h5>
    </label>
    <Select
      placeholder="selecione..."
      defaultValue={[]}
      onChange={(item) => setSelectedSpecialty(Number(item.value))}
      options={specialtyOptions}
      className="basic-multi-select field-box "
      classNamePrefix="select"
    />
  </div>
  )
}

export default AppointmentSpecialty
