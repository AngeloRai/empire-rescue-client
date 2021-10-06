import * as Yup from "yup";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputFeedback from "../../componentHelpers/InputFeedback";

function UserForm({ handleSubmit, setToggled, error }) {
  const userValidation = Yup.object().shape({
    email: Yup.string()
      .email("Por favor informe email valido.")
      .required("Por favor informe um email."),
  });

  return (
    <div className="container">
      <Formik
        initialValues={{
          email: "",
          role: "USER",
        }}
        validationSchema={userValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <div>
              <div className="form-group m-2 col-10 col-md-6">
                <label htmlFor="registerEmail">Email do Usuario</label>
                <Field
                  type="text"
                  className={`field-box fields form-control ${
                    errors.email && touched.email ? "is-invalid" : "is-valid"
                  }`}
                  id="registerEmail"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <InputFeedback invalid={errors.email && touched.email}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="edit-buttons-box col-10 col-md-6 m-4">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.email}
                >
                  <div>
                    {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                  </div>
                </button>

                  <div
                    className="btn btn-warning"
                    onClick={() => setToggled(false)}
                  >
                    Fechar
                  </div>

              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
