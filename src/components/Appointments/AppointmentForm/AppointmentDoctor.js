import React from "react";
import Select from "react-select";

function AppointmentDoctor({ setSelectedDoctor, docOptions }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerDoctor">
        <h5>Medico</h5>
      </label>
      <Select
        placeholder="selecione..."
        defaultValue={[]}
        onChange={(item) => setSelectedDoctor(Number(item.value))}
        options={docOptions}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppointmentDoctor;
