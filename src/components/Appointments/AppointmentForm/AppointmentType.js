import React from "react";
import Select from "react-select";

function AppointmentType({ setSelectedAppointType }) {
  const appointmentTypes = [
    { label: "consulta", value: "consulta" },
    { label: "exame", value: "exame" },
  ];
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerType">
        <h5>Tipo de Agendamento</h5>
      </label>
      <Select
        placeholder="selecione..."
        defaultValue={[]}
        onChange={(item) => setSelectedAppointType(item.value)}
        options={appointmentTypes}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppointmentType;
