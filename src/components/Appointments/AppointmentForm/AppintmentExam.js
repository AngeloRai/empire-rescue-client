import React from "react";
import Select from "react-select";

function AppintmentExam({ setSelectedExam, examOptions }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerExam">
        <h5>Exame</h5>
      </label>
      <Select
        placeholder="selecione..."
        defaultValue={[]}
        onChange={(item) => setSelectedExam(Number(item.value))}
        options={examOptions}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
    </div>
  );
}

export default AppintmentExam;
