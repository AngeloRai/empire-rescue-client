import React from "react";

function AppointmentDateTime({ setFieldValue, values }) {
  return (
    <div className="form-group m-1 col-8 col-lg-5 d-flex flex-column border p-3">
      <label htmlFor="registerDateTime">
        <h5>Data e Hora</h5>
      </label>
      <input
        name="dateTime"
        type="datetime-local"
        onChange={(item) => setFieldValue("dateTime", item.target.value)}
        value={values.dateTime}
        className="basic-multi-select field-box p-2 "
        style={{ height: "38px" }}
      />
    </div>
  );
}

export default AppointmentDateTime;
