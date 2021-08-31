import React from "react";
import { Field } from "formik";

function AppointmentStatus() {
  return (
    <div
      role="group"
      aria-labelledby="my-radio-group"
      className="col-8 col-md-7 col-lg-7 border p-3 m-1"
    >
      <div id="my-radio-group" className="my-1">
        <h5>Stuatus</h5>
      </div>
      <div className="field-box">
        <label className="m-2 ">
          <h6>PENDENTE</h6>
        </label>
        <Field className="mx-2 " type="radio" name="status" value="pendente" />
        <label className="m-2">
          <h6>INFORMADO</h6>
        </label>
        <Field className="mx-2" type="radio" name="status" value="informado" />
        <label className="m-2">
          <h6>REALIZADO</h6>
        </label>
        <Field className="mx-2 " type="radio" name="status" value="realizado" />
        <label className="m-2">
          <h6>AUSENTE</h6>
        </label>
        <Field className="mx-2" type="radio" name="status" value="ausente" />
      </div>
    </div>
  );
}

export default AppointmentStatus;
