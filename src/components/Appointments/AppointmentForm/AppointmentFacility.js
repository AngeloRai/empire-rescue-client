import React from "react";
import Select from "react-select";

function AppointmentFacility({
  facilityOptions,
  setSelectedFacility,
  facility,
}) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerFacility">
        <h5>Estabelecimento</h5>
      </label>

      <Select
        noOptionsMessage={() =>
          "Nenhum estabelecimento econtrado com especialidade selecionada."
        }
        isClearable={true}
        placeholder="selecione..."
        defaultValue={facility}
        onChange={(item) =>
          setSelectedFacility(item?.value ? Number(item?.value) : null)
        }
        options={facilityOptions}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppointmentFacility;
