import React from "react";
import Select from "react-select";

function AppintmentExam({ setSelectedExam, examOptions, exam }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerExam">
        <h5>Exame</h5>
      </label>
      <Select
      noOptionsMessage={() =>
          "Nenhum estabelecimento econtrado com exame selecionado."
        }
      isClearable={true}
        placeholder="selecione..."
        defaultValue={exam}
        onChange={(item) => setSelectedExam(item?.value ? Number(item?.value) : null)}
        options={examOptions}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppintmentExam;
