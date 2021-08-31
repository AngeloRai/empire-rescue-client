import * as Yup from "yup";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./FormExam.css";
import InputFeedback from "../componentHelpers/InputFeedback";


function FormExam({ handleSubmit }) {
  const examValidation = Yup.object().shape({
    examName: Yup.string().max(100).required("Por favor informe nome do exame."),
    examType: Yup.string().required("Por favor informe tipo do exame."),
    
  });

  return (
    <div className="container ">
        <Formik
          initialValues={{
            examName: "",
            examType: "",
          }}
          validationSchema={examValidation}
          onSubmit={(values, { setSubmitting })  => {
            
            handleSubmit(values)

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <div>
                <div className="form-group m-4 col-10 col-md-6">
                  <label htmlFor="registerExamName">Nome do Exame</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.examName && touched.examName ? "is-invalid" : "is-valid"
                    }`}
                    id="registerExamName"
                    name="examName"
                  />
                  <ErrorMessage
                    name="examName"
                    render={(msg) => (
                      <InputFeedback invalid={errors.examName && touched.examName}>
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                <div className="form-group m-4 col-10 col-md-6">
                  <label htmlFor="registerExamType">Tipo do Exame</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.examType && touched.examType ? "is-invalid" : "is-valid"
                    }`}
                    id="registerExamType"
                    name="examType"
                  />
                  <ErrorMessage
                    name="examType"
                    render={(msg) => (
                      <InputFeedback invalid={errors.examType && touched.examType}>
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                
              <div className="edit-buttons-box col-10 col-md-6 m-4">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.examName || !values.examType}
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

export default FormExam;
