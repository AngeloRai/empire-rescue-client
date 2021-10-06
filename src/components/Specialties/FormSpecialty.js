import * as Yup from "yup";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./FormSpecialty.css";
import InputFeedback from "../componentHelpers/InputFeedback";


function FormSpecialty({ handleSubmit, specialty }) {

  const specialtyValidation = Yup.object().shape({
    name: Yup.string().max(100).required("Por favor informe nome do exame."),    
  });

  return (
    <div className="container">
        <Formik
          initialValues={{
            name: specialty.name || "",
          }}
          validationSchema={specialtyValidation}
          onSubmit={(values, { setSubmitting })  => {
            
            handleSubmit(values)

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <div className="row">
                <div className="form-group m-4 col-10 col-md-6">
                  <label htmlFor="registername">Nome da Especialidade</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.name && touched.name ? "is-invalid" : "is-valid"
                    }`}
                    id="registername"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => (
                      <InputFeedback invalid={errors.name && touched.name}>
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                
              <div className="m-4 col-10 col-md-6 text-center">
                <button
                  type="submit"
                  className="btn btn-secondary "
                  disabled={isSubmitting || !values.name }
                >
                    <div>
                      {isSubmitting ? (
                        <span>Loading</span>
                      ) : (
                        <span>Enviar</span>
                      )}
                    </div>
                </button>
              </div>
              </div>
            </Form>
          )}
        </Formik>
      
    </div>
  );
}

export default FormSpecialty;
