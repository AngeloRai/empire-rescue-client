import React from "react";
import Select from "react-select";

function AppointmentDoctor({ setSelectedDoctor, docOptions, doctor }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerDoctor">
        <h5>Medico</h5>
      </label>
      <Select
        noOptionsMessage={() =>
          "Nenhum Medico econtrado com estabelecimento selecionado."
        }
        isClearable={true}
        placeholder="selecione..."
        defaultValue={doctor}
        onChange={(item) =>
          setSelectedDoctor(item?.value ? Number(item?.value) : null)
        }
        options={docOptions}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppointmentDoctor;
