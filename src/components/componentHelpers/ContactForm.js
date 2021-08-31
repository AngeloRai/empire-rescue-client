import React from "react";
import { Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import {
  mobileNumberMask,
  phoneNumberMask,
} from "./validationHelpers";
import InputFeedback from "./InputFeedback";

function FacilityFormContact({ errors, touched, handleChange, handleBlur, isFacility }) {
  return (
    <div>
      <hr className="my-4" />
      <h5>CONTATO</h5>
      <div className="row">
        <div className="form-group m-2 col-8 col-md-5 col-lg-3">
          <label htmlFor="registerEmail">Celular *</label>
          <Field name="phone1">
            {({ field }) => (
              <MaskedInput
                {...field}
                name="phone1"
                mask={mobileNumberMask}
                id="phone1"
                placeholder="Informe celular"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`field-box fields form-control ${
                  errors.phone1 && touched.phone1 ? "is-invalid" : "is-valid"
                }`}
              />
            )}
          </Field>
          <ErrorMessage name="phone1">
            {(msg) => (
              <InputFeedback invalid={errors.phone1 && touched.phone1}>
                {msg}
              </InputFeedback>
            )}
            </ErrorMessage>
        </div>
        {isFacility &&<div className="form-group m-2 col-8 col-md-5 col-lg-3">
          <label htmlFor="registerEmail">Celular </label>
          <Field name="phone3">

            {({ field }) => (
              <MaskedInput
                {...field}
                mask={mobileNumberMask}
                id="phone3"
                placeholder="Informe celular"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`field-box fields form-control ${
                  errors.phone3 && touched.phone3 ? "is-invalid" : "is-valid"
                }`}
              />
            )}
          </Field>
          <ErrorMessage name="phone3">
            {(msg) => (
              <InputFeedback invalid={errors.phone3 && touched.phone3}>
                {msg}
              </InputFeedback>
            )}
            </ErrorMessage>
        </div>}
         <div className="form-group m-2 col-8 col-md-5 col-lg-3">
          <label htmlFor="registerEmail">Telefone </label>
          <Field name="phone2">
            {({ field }) => (
              <MaskedInput
                {...field}
                mask={phoneNumberMask}
                id="phone2"
                placeholder="Informe celular"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`field-box fields form-control ${
                  errors.phone2 && touched.phone2 ? "is-invalid" : "is-valid"
                }`}
              />
            )}
          </Field>
          <ErrorMessage name="phone2">
            {(msg) => (
              <InputFeedback invalid={errors.phone2 && touched.phone2}>
                {msg}
              </InputFeedback>
            )}
            </ErrorMessage>
        </div>

        

        {isFacility && <div className="form-group m-2 col-8 col-md-5">
          <label htmlFor="registerEmail">Email</label>
          <Field
            placeholder="email..."
            type="text"
            className={`field-box fields form-control ${
              errors.email && touched.email ? "is-invalid" : "is-valid"
            }`}
            id="registerEmail"
            name="email"
          />
          <ErrorMessage name="email">
            {(msg) => (
              <InputFeedback invalid={errors.email && touched.email}>
                {msg}
              </InputFeedback>
            )}
            </ErrorMessage>
        </div>}
      </div>
    </div>
  );
}

export default FacilityFormContact;
